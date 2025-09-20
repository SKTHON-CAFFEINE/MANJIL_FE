import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import * as vision from "@mediapipe/tasks-vision";
import styled from "styled-components";
import backIcon from "@icon/home/goBack.svg";
import { saveExerciseProgress, markExerciseComplete, formatDateForStorage, getExerciseProgressById } from "../../shared/lib/exerciseProgress";

const VISION_WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.15/wasm";
const POSE_TASK_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task";

export default function ExerciseVertifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { onModalChange } = useOutletContext();
  const exercise = location.state?.exercise;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [count, setCount] = useState(0);
  const [, setState] = useState("IDLE");
  const [, setAngle] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const landmarkerRef = useRef(null);
  const rafRef = useRef(0);
  const streamRef = useRef(null);
  const fsmRef = useRef("UP");
  const kneeEMARef = useRef(null);

  const MIN_DEPTH_DEG = 85;
  const MAX_UP_DEG = 155;

  function angleDeg(a, b, c) {
    const v1 = [a.x - b.x, a.y - b.y];
    const v2 = [c.x - b.x, c.y - b.y];
    const dot = v1[0] * v2[0] + v1[1] * v2[1];
    const m1 = Math.hypot(...v1),
      m2 = Math.hypot(...v2);
    if (!m1 || !m2) return 180;
    const cosv = Math.min(1, Math.max(-1, dot / (m1 * m2)));
    return (Math.acos(cosv) * 180) / Math.PI;
  }
  const ema = (prev, next, a = 0.35) => (prev == null ? next : prev * (1 - a) + next * a);

  async function start() {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
        audio: false,
      });
      if (!videoRef.current) return;
      videoRef.current.srcObject = streamRef.current;
      await videoRef.current.play();

      const fileset = await vision.FilesetResolver.forVisionTasks(VISION_WASM_URL);
      const landmarker = await vision.PoseLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: POSE_TASK_URL },
        runningMode: "VIDEO",
        numPoses: 1,
      });
      landmarkerRef.current = landmarker;

      fsmRef.current = "UP";
      // 카운트는 초기화하지 않고 현재 값 유지
      setState("READY");
      setIsPaused(false);
      kneeEMARef.current = null;
      loop();
    } catch (e) {
      console.error(e);
      alert("카메라 권한 또는 모델 로드에 실패했습니다.");
      stop();
    }
  }

  function stop() {
    cancelAnimationFrame(rafRef.current);
    landmarkerRef.current?.close?.();
    landmarkerRef.current = null;
    streamRef.current?.getTracks?.().forEach((t) => t.stop());
    streamRef.current = null;
    setState("IDLE");
  }

  function loop() {
    rafRef.current = requestAnimationFrame(loop);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !video.videoWidth || !landmarkerRef.current) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    // 좌우 반전(셀피 미러)
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // 추론
    const res = landmarkerRef.current.detectForVideo(video, performance.now());
    const kp = res.landmarks?.[0];
    if (!kp) {
      setState("NO_PERSON");
      return;
    }

    // 오른쪽 엉덩이-무릎-발목
    const hip = kp[24],
      knee = kp[26],
      ankle = kp[28];
    let kneeDeg = angleDeg(hip, knee, ankle);
    kneeDeg = kneeEMARef.current = ema(kneeEMARef.current, kneeDeg);
    setAngle(kneeDeg);

    // FSM
    if (fsmRef.current === "UP" && kneeDeg < MIN_DEPTH_DEG + 10) fsmRef.current = "GOING_DOWN";
    if (fsmRef.current === "GOING_DOWN" && kneeDeg < MIN_DEPTH_DEG) fsmRef.current = "DOWN";
    if (fsmRef.current === "DOWN" && kneeDeg > MAX_UP_DEG) {
      fsmRef.current = "UP";
      setCount((c) => {
        const newCount = c + 1;
        // 카운트가 올라갈 때마다 localStorage에 저장
        if (exercise) {
          const today = formatDateForStorage(new Date());
          saveExerciseProgress(exercise.exerciseId, newCount, exercise.reps, today);
        }
        return newCount;
      });
    }
    setState(fsmRef.current);
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleStopClick = () => {
    setShowModal(true);
    onModalChange(true);
  };

  const handleCancelClick = () => {
    setShowModal(false);
    onModalChange(false);
  };

  const handleConfirmClick = () => {
    setShowModal(false);
    onModalChange(false);
    stop();
    setIsPaused(true);
  };

  const handleCompleteClick = () => {
    if(count>=exercise.reps){
    setShowCompleteModal(true);
    onModalChange(true);
    } else {
      alert("횟수를 모두 채워주세요.");
    }
  };

  const handleCompleteCancelClick = () => {
    setShowCompleteModal(false);
    onModalChange(false);
  };

  const handleCompleteConfirmClick = () => {
    setShowCompleteModal(false);
    onModalChange(false);
    
    // 운동 완료 상태 저장
    if (exercise) {
      const today = formatDateForStorage(new Date());
      markExerciseComplete(exercise.exerciseId, today);
    }
    
    // 운동 완료 시 카운트 리셋
    setCount(0);
    stop();
    setIsPaused(false);
    navigate("/exercise-report");
  };

  // 페이지 로드 시 저장된 카운트 불러오기
  useEffect(() => {
    if (exercise) {
      const today = formatDateForStorage(new Date());
      const savedProgress = getExerciseProgressById(exercise.exerciseId, today);
      if (savedProgress && !savedProgress.isCompleted) {
        setCount(savedProgress.currentCount);
      }
    }
  }, [exercise]);

  useEffect(() => {
    return () => stop();
  }, []);

  if (!exercise) {
    return (
      <ExerciseVertifyPageWrapper>
        <Header>
          <BackButton onClick={handleBackClick}>
            <BackIcon src={backIcon} alt="뒤로가기" />
          </BackButton>
          <HeaderTitle>운동 검증</HeaderTitle>
        </Header>
        <ContentContainer>
          <VertifyTitle>운동 정보를 찾을 수 없습니다.</VertifyTitle>
        </ContentContainer>
      </ExerciseVertifyPageWrapper>
    );
  }

  return (
    <ExerciseVertifyPageWrapper>
      <Header>
        <BackButton onClick={handleBackClick}>
          <BackIcon src={backIcon} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>오늘의 맞춤 운동 추천</HeaderTitle>
      </Header>

      <ContentContainer>
        <TopSection>
          <VertifyTitle>
            {exercise.name} {exercise.reps}
            {exercise.unit}
          </VertifyTitle>
          <div style={{ display: "flex", gap: 8 }}>
            <CameraButton onClick={start}>{isPaused ? "운동 재개" : "카메라 켜기"}</CameraButton>
          </div>
        </TopSection>

        <div style={{ marginTop: 20 }}>
          <video ref={videoRef} style={{ display: "none" }} playsInline muted />
          <canvas
            ref={canvasRef}
            style={{ width: "100%", maxWidth: 640, borderRadius: 12, height: 488 }}
          />
        </div>

        <CountText>
          <HighlightSpan>{count}</HighlightSpan>/{exercise.reps}
          <SmallHighlight>{exercise.unit}</SmallHighlight>
        </CountText>

        <ButtonSection>
          <StopButton onClick={handleStopClick}>운동 중단</StopButton>
          <CompleteButton onClick={handleCompleteClick}>운동 완료</CompleteButton>
        </ButtonSection>
      </ContentContainer>

      {showModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>정말로 중단하시겠습니까?</ModalTitle>
            <ModalButtonContainer>
              <ModalCancelButton onClick={handleCancelClick}>취소</ModalCancelButton>
              <ModalConfirmButton onClick={handleConfirmClick}>확인</ModalConfirmButton>
            </ModalButtonContainer>
          </ModalContainer>
        </ModalOverlay>
      )}

      {showCompleteModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>운동을 완료하시겠습니까?</ModalTitle>
            <ModalButtonContainer>
              <ModalCancelButton onClick={handleCompleteCancelClick}>취소</ModalCancelButton>
              <ModalConfirmButton onClick={handleCompleteConfirmClick}>완료</ModalConfirmButton>
            </ModalButtonContainer>
          </ModalContainer>
        </ModalOverlay>
      )}
    </ExerciseVertifyPageWrapper>
  );
}

const ExerciseVertifyPageWrapper = styled.div``;

const ContentContainer = styled.div`
  padding: 20px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Header = styled.header`
  background: #fff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BackIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const HeaderTitle = styled.h1`
  margin: 0;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 18px;
  color: #1a1a1a;
`;

const VertifyTitle = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 34px; /* 141.667% */
  margin-bottom: 17px;
`;

const CameraButton = styled.button`
  width: 120px;
  height: 33px;
  flex-shrink: 0;
  border-radius: 10px;
  padding: 1px 5px 1px 5px;
  background: #8583b0;
  color: #fff;
  font-family: Pretendard;
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 22px */
  letter-spacing: -0.44px;
  border: none;

  &:hover {
    background: #333159;
  }
`;

const CountText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  color: #000;
  font-family: Pretendard;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 34px;
  justify-content: center;
  margin-top: 20px;
`;

const HighlightSpan = styled.span`
  color: #2f6eee;
  font-family: Pretendard;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 34px; /* 70.833% */
`;

const SmallHighlight = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 34px; /* 106.25% */
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 45px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-bottom: 120px;
`;

const StopButton = styled.button`
  width: 161px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #2f6eee;
  color: #fff;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 22px */
  letter-spacing: -0.44px;
  border: none;
`;

const CompleteButton = styled.button`
  width: 161px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #a4a4a4;
  color: #fff;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 22px */
  letter-spacing: -0.44px;
  border: none;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 320px;
  width: 90%;
`;

const ModalTitle = styled.h2`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
  text-align: center;
  margin: 0 0 24px 0;
  line-height: 1.4;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const ModalCancelButton = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 8px;
  background: #f5f5f5;
  color: #666;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background: #e8e8e8;
  }
`;

const ModalConfirmButton = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 8px;
  background: #2f6eee;
  color: white;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background: #1e5ad4;
  }
`;
