import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as vision from "@mediapipe/tasks-vision";
import styled from "styled-components";
import backIcon from "@icon/home/goBack.svg";

const VISION_WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.15/wasm";
const POSE_TASK_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task";

export default function ExerciseVertifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const exercise = location.state?.exercise;
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [count, setCount] = useState(0);
  const [state, setState] = useState("IDLE");
  const [angle, setAngle] = useState(0);
  const [running, setRunning] = useState(false);

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
      setCount(0);
      setState("READY");
      setRunning(true);
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
    setRunning(false);
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
      setCount((c) => c + 1);
    }
    setState(fsmRef.current);
  }

  const handleBackClick = () => {
    navigate(-1);
  };

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
        <VertifyTitle>{exercise.name}</VertifyTitle>
        <div style={{ display: "flex", gap: 8 }}>
          {!running ? (
            <button onClick={start}>카메라 켜기</button>
          ) : (
            <button onClick={stop}>카메라 끄기</button>
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <video ref={videoRef} style={{ display: "none" }} playsInline muted />
          <canvas ref={canvasRef} style={{ width: "100%", maxWidth: 640, borderRadius: 12 }} />
        </div>

        <p>COUNT: {count}</p>
        <p>STATE: {state}</p>
        <p>KNEE: {angle.toFixed(0)}°</p>
        <p style={{ color: "#666", marginTop: 8 }}>
          팁: 측면(사이드뷰)에서 몸 전체가 프레임에 들어오게 촬영해 주세요.
        </p>
      </ContentContainer>
    </ExerciseVertifyPageWrapper>
  );
}

const ExerciseVertifyPageWrapper = styled.div``;

const ContentContainer = styled.div`
  padding: 20px;
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

const VertifyTitle = styled.p``;
