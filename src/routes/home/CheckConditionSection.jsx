import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import sleepIcon from "@icon/home/sleep.svg";
import fatigueIcon from "@icon/home/fatigue.svg";
import muscleIcon from "@icon/home/muscle.svg";
import angry from "@icon/home/angry.svg";
import sad from "@icon/home/sad.svg";
import smile from "@icon/home/smile.svg";
import closeIcon from "@icon/home/closeButton.svg";
import { UserAPI } from "../../shared/lib/api";

// 각 컨디션별 모달 컴포넌트
const SleepModal = ({ onClose, onSelect }) => (
  <ModalBody>
    <SleepModalHeader>
      <SleepModalTitle>수면상태</SleepModalTitle>
      <CloseButton onClick={onClose}>
        <CloseIcon src={closeIcon} alt="닫기" />
      </CloseButton>
    </SleepModalHeader>
    <SleepModalSubtitleWrapper>
      <SleepModalSubtitle>수면상태를 기록하면</SleepModalSubtitle>
      <SleepModalSubtitle>정확한 운동 추천이 가능해져요!</SleepModalSubtitle>
    </SleepModalSubtitleWrapper>
    <SleepOptions>
      <SleepOption onClick={() => onSelect("good")}>
        <SleepIcon src={smile} alt="웃는 얼굴" />
        <SleepText>
          <SleepTitle>충분히 잘 잤어요</SleepTitle>
          <SleepTime>7시간 이상</SleepTime>
        </SleepText>
      </SleepOption>
      <SleepOption onClick={() => onSelect("normal")}>
        <SleepIcon src={sad} alt="슬픈 얼굴" />
        <SleepText>
          <SleepTitle>보통 정도 잤어요</SleepTitle>
          <SleepTime>5~6시간</SleepTime>
        </SleepText>
      </SleepOption>
      <SleepOption onClick={() => onSelect("bad")}>
        <SleepIcon src={angry} alt="화난 얼굴" />
        <SleepText>
          <SleepTitle>잠이 많이 부족해요</SleepTitle>
          <SleepTime>4시간 이하</SleepTime>
        </SleepText>
      </SleepOption>
    </SleepOptions>
  </ModalBody>
);

const FatigueModal = ({ onClose, onSelect }) => (
  <ModalBody>
    <SleepModalHeader>
      <SleepModalTitle>피로도</SleepModalTitle>
      <CloseButton onClick={onClose}>
        <CloseIcon src={closeIcon} alt="닫기" />
      </CloseButton>
    </SleepModalHeader>
    <SleepModalSubtitleWrapper>
      <SleepModalSubtitle>피로도를 기록하면</SleepModalSubtitle>
      <SleepModalSubtitle>정확한 운동 추천이 가능해져요!</SleepModalSubtitle>
    </SleepModalSubtitleWrapper>
    <SleepOptions>
      <SleepOption onClick={() => onSelect("good")}>
        <SleepIcon src={smile} alt="웃는 얼굴" />
        <SleepText>
          <SleepTitle>피곤하지 않아요</SleepTitle>
        </SleepText>
      </SleepOption>
      <SleepOption onClick={() => onSelect("normal")}>
        <SleepIcon src={sad} alt="슬픈 얼굴" />
        <SleepText>
          <SleepTitle>조금 피곤해요</SleepTitle>
        </SleepText>
      </SleepOption>
      <SleepOption onClick={() => onSelect("bad")}>
        <SleepIcon src={angry} alt="화난 얼굴" />
        <SleepText>
          <SleepTitle>너무 피곤해요</SleepTitle>
        </SleepText>
      </SleepOption>
    </SleepOptions>
  </ModalBody>
);

const MuscleModal = ({ onClose, onSelect }) => (
  <ModalBody>
    <SleepModalHeader>
      <SleepModalTitle>근육통</SleepModalTitle>
      <CloseButton onClick={onClose}>
        <CloseIcon src={closeIcon} alt="닫기" />
      </CloseButton>
    </SleepModalHeader>
    <SleepModalSubtitleWrapper>
      <SleepModalSubtitle>근육통 정도를 기록하면</SleepModalSubtitle>
      <SleepModalSubtitle>정확한 운동 추천이 가능해져요!</SleepModalSubtitle>
    </SleepModalSubtitleWrapper>
    <SleepOptions>
      <SleepOption onClick={() => onSelect("good")}>
        <SleepIcon src={smile} alt="웃는 얼굴" />
        <SleepText>
          <SleepTitle>몸이 가볍고 좋아요</SleepTitle>
        </SleepText>
      </SleepOption>
      <SleepOption onClick={() => onSelect("normal")}>
        <SleepIcon src={sad} alt="슬픈 얼굴" />
        <SleepText>
          <SleepTitle>몸이 좀 뻐근해요</SleepTitle>
        </SleepText>
      </SleepOption>
      <SleepOption onClick={() => onSelect("bad")}>
        <SleepIcon src={angry} alt="화난 얼굴" />
        <SleepText>
          <SleepTitle>움직일 때 많이 아파요</SleepTitle>
        </SleepText>
      </SleepOption>
    </SleepOptions>
  </ModalBody>
);

export default function CheckConditionSection({ onModalChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [conditionStates, setConditionStates] = useState({
    sleep: null,
    fatigue: null,
    muscle: null,
  });
  const [allConditionsStates, setAllConditionsStates] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "사용자",
    point: 0,
    recommendedToday: false
  });

  // 오늘 추천 받았는지 확인하는 함수
  const checkTodayRecommendation = () => {
    const today = new Date().toDateString(); // "Mon Jan 01 2024" 형식
    const lastRecommendationDate = localStorage.getItem('lastRecommendationDate');
    console.log("프론트엔드 제한 확인:", { today, lastRecommendationDate, isRecommended: lastRecommendationDate === today });
    return lastRecommendationDate === today;
  };

  // 테스트용: localStorage 초기화 함수 (개발자 도구에서 사용)
  const resetRecommendationLimit = () => {
    localStorage.removeItem('lastRecommendationDate');
    console.log("추천 제한 초기화됨");
    fetchUserInfo(); // 상태 다시 확인
  };

  // 개발자 도구에서 사용할 수 있도록 전역 함수로 등록
  if (typeof window !== 'undefined') {
    window.resetRecommendationLimit = resetRecommendationLimit;
  }

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      console.log("사용자 정보를 가져오는 중...");
      const response = await UserAPI.getUserSummary();
      console.log("사용자 정보 API 응답:", response);
      if (response.success) {
        // API 데이터를 사용하되, recommendedToday는 프론트엔드 제한으로 덮어쓰기
        const userData = {
          ...response.data,
          recommendedToday: checkTodayRecommendation() // 프론트엔드 제한 우선 적용
        };
        setUserInfo(userData);
        console.log("사용자 정보 업데이트됨 (프론트엔드 제한 적용):", userData);
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      // API 호출 실패 시 기본값 사용
      setUserInfo({
        username: "사용자",
        point: 0,
        recommendedToday: checkTodayRecommendation() // 프론트엔드에서 확인
      });
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 페이지가 변경될 때마다 사용자 정보 다시 가져오기
  useEffect(() => {
    fetchUserInfo();
  }, [location.pathname]);

  // 컴포넌트가 다시 마운트될 때마다 사용자 정보 새로고침
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchUserInfo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // 컴포넌트 마운트 시 localStorage에서 컨디션 상태 복원
  useEffect(() => {
    const savedConditions = localStorage.getItem("userConditions");
    if (savedConditions) {
      try {
        const parsedConditions = JSON.parse(savedConditions);
        setConditionStates(parsedConditions);
        
        // 모든 컨디션이 설정되어 있으면 버튼 활성화
        if (parsedConditions.sleep !== null && parsedConditions.fatigue !== null && parsedConditions.muscle !== null) {
          setAllConditionsStates(true);
        }
      } catch (error) {
        console.error("저장된 컨디션 데이터를 불러오는데 실패했습니다:", error);
      }
    }
  }, []);

  const conditions = [
    {
      id: "sleep",
      title: "수면상태",
      icon: sleepIcon,
    },
    {
      id: "fatigue",
      title: "피로도",
      icon: fatigueIcon,
    },
    {
      id: "muscle",
      title: "근육통",
      icon: muscleIcon,
    },
  ];

  const handleConditionClick = (conditionId) => {
    setSelectedCondition(conditionId);
    onModalChange?.(true);
  };

  const closeModal = () => {
    setSelectedCondition(null);
    onModalChange?.(false);
  };

  const getConditionIcon = (conditionId) => {
    const state = conditionStates[conditionId];
    if (!state) return conditions.find((c) => c.id === conditionId)?.icon;

    switch (conditionId) {
      case "sleep":
        return state === "good" ? smile : state === "normal" ? sad : angry;
      case "fatigue":
        return state === "good" ? smile : state === "normal" ? sad : angry;
      case "muscle":
        return state === "good" ? smile : state === "normal" ? sad : angry;
      default:
        return conditions.find((c) => c.id === conditionId)?.icon;
    }
  };

  const getConditionButtonText = (conditionId) => {
    const state = conditionStates[conditionId];
    if (!state) return "입력하기";

    switch (conditionId) {
      case "sleep":
        return state === "good" ? "충분" : state === "normal" ? "보통" : "부족";
      case "fatigue":
        return state === "good" ? "충분" : state === "normal" ? "보통" : "부족";
      case "muscle":
        return state === "good" ? "양호" : state === "normal" ? "보통" : "심함";
      default:
        return "입력하기";
    }
  };

  const handleConditionSelect = (conditionId, state) => {
    setConditionStates((prev) => {
      const next = { ...prev, [conditionId]: state };

      // if문으로 확인
      if (next.sleep !== null && next.fatigue !== null && next.muscle !== null) {
        setAllConditionsStates(true);
      } else {
        setAllConditionsStates(false);
      }

      return next;
    });
    closeModal();
  };

  const handleRecommendationClick = () => {
    // 컨디션 데이터를 localStorage에 저장
    localStorage.setItem("userConditions", JSON.stringify(conditionStates));
    
    // 운동 추천 페이지로 이동
    navigate("/exercise-recommendation", {
      state: {
        conditionData: conditionStates
      }
    });
  };

  return (
    <SectionWrapper>
      <SectionTitle>오늘의 컨디션 체크하기</SectionTitle>
      <CardsContainer>
        {conditions.map((condition) => (
          <ConditionCard key={condition.id}>
            <ConditionTitle>{condition.title}</ConditionTitle>
            <ConditionIcon src={getConditionIcon(condition.id)} alt={condition.title} />
            <InputButton onClick={() => handleConditionClick(condition.id)}>
              {getConditionButtonText(condition.id)}
            </InputButton>
          </ConditionCard>
        ))}
      </CardsContainer>

      {allConditionsStates && (
        <>
          {userInfo.recommendedToday ? (
            <AlreadyRecommendedButton disabled>
              운동 추천은 하루에 한번만!
            </AlreadyRecommendedButton>
          ) : (
            <RecomandationButton onClick={handleRecommendationClick}>
              오늘의 운동 추천
            </RecomandationButton>
          )}
        </>
      )}

      {selectedCondition && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent className="open" onClick={(e) => e.stopPropagation()}>
            {selectedCondition === "sleep" && (
              <SleepModal
                onClose={closeModal}
                onSelect={(state) => handleConditionSelect("sleep", state)}
              />
            )}
            {selectedCondition === "fatigue" && (
              <FatigueModal
                onClose={closeModal}
                onSelect={(state) => handleConditionSelect("fatigue", state)}
              />
            )}
            {selectedCondition === "muscle" && (
              <MuscleModal
                onClose={closeModal}
                onSelect={(state) => handleConditionSelect("muscle", state)}
              />
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  border-radius: 20px 20px 0 0;
  background: #f7f8fc;
  box-shadow: 0 -5px 15px 0 rgba(0, 0, 0, 0.03);
  padding: 20px;
  margin-top: -20px;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.p`
  color: #1a1a1a;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

const ConditionCard = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 16px 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 140px;
`;

const ConditionTitle = styled.h3`
  color: #1a1a1a;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ConditionIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 12px;
`;

const InputButton = styled.button`
  border: none;
  border-radius: 18px;
  background: #e0e9fc;
  padding: 8px 16px;
  color: #1d4ed8;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 390px;
  max-height: 80vh;
  overflow-y: auto;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;

  &.open {
    transform: translateY(0);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #1a1a1a;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
`;

const CloseIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

// 수면 모달 스타일
const SleepModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

const SleepModalTitle = styled.h2`
  color: #000;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%; /* 40.5px */
  justify-content: space-between;
  width: 100%;
`;

const SleepModalSubtitleWrapper = styled.div`
  margin-bottom: 32px;
`;

const SleepModalSubtitle = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%; /* 27px */
`;

// 피로도 모달 스타일
const FatigueModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const FatigueModalTitle = styled.h2`
  color: #1a1a1a;
  font-family: Roboto;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  flex: 1;
`;

const FatigueModalSubtitle = styled.p`
  color: #666;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
`;

// 근육통 모달 스타일
const MuscleModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MuscleModalTitle = styled.h2`
  color: #1a1a1a;
  font-family: Roboto;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  flex: 1;
`;

const MuscleModalSubtitle = styled.p`
  color: #666;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
`;

const SleepOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const SleepOption = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;

  &:hover {
    border-color: #4b86ff;
    background: #f8f9ff;
  }
`;

const SleepIcon = styled.img`
  width: 45.183px;
  height: 45.183px;
`;

const SleepText = styled.div`
  flex: 1;
`;

const SleepTitle = styled.div`
  color: #333;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const SleepTime = styled.div`
  color: #666;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
`;

// 피로도 모달 스타일
const FatigueOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const FatigueOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

const FatigueRadio = styled.input`
  margin: 0;
`;

const FatigueLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FatigueIcon = styled.span`
  font-size: 20px;
`;

const FatigueText = styled.span`
  color: #333;
  font-family: Roboto;
  font-size: 14px;
`;

// 근육통 모달 스타일
const MuscleOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`;

const MuscleOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

const MuscleCheckbox = styled.input`
  margin: 0;
`;

const MuscleLabel = styled.span`
  color: #333;
  font-family: Roboto;
  font-size: 14px;
`;

const PainLevelContainer = styled.div`
  margin: 20px 0;
`;

const PainLevelLabel = styled.label`
  display: block;
  color: #333;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const PainLevelSlider = styled.input`
  width: 100%;
  margin-bottom: 8px;
`;

const PainLevelValues = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 12px;
`;

// 공통 버튼 스타일
const SubmitButton = styled.button`
  width: 100%;
  background: #4b86ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const RecomandationButton = styled.button`
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #2f6eee;
  cursor: pointer;
  margin-top: 12.49px;
  color: #fff;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%; /* 27px */
  border: none;

  &:hover {
    background-color: #08358d;
    opacity: 0.8;
  }
`;

const AlreadyRecommendedButton = styled.button`
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #e5e5e5;
  cursor: not-allowed;
  margin-top: 12.49px;
  color: #666;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%; /* 27px */
  border: none;
  opacity: 0.8;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`;
