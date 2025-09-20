import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import backIcon from "@icon/home/goBack.svg";
import { ExerciseAPI } from "../../shared/lib/api";
import ExerciseCard from "./ExerciseCard";

export default function ReportPage() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diseases, setDiseases] = useState([]);
  const [disclaimer, setDisclaimer] = useState("");

  // 컨디션 상태 관리 (localStorage에서 불러오거나 기본값 설정)
  const [conditions, setConditions] = useState(() => {
    const savedConditions = localStorage.getItem("exerciseConditions");
    return savedConditions
      ? JSON.parse(savedConditions)
      : {
          sleep: "GOOD",
          fatigue: "LOW",
          soreness: "NONE",
        };
  });

  // eslint-disable-next-line no-unused-vars
  const updateConditions = (newConditions) => setConditions(newConditions);

  // 날짜를 한국어 형식으로 포맷팅 (YYYY년 MM월 DD일)
  const formatDateKorean = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  // 이전 날짜로 이동
  const goToPreviousDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  // 다음 날짜로 이동
  const goToNextDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };


  // 맞춤 운동 다시하기 버튼 클릭 핸들러
  const handleRetryExercise = (exercise) => {
    // 디버깅을 위한 콘솔 로그
    console.log("Diseases data:", diseases);
    console.log("Disclaimer:", disclaimer);
    
    // 임시 테스트 데이터 (API에서 데이터를 받지 못할 경우)
    const testDiseases = diseases.length > 0 ? diseases : [
      {
        id: 1,
        type: "고혈압",
        caution: "운동 중 숨을 참지 말고, 자연스럽게 호흡하세요. 더운 날씨처럼 체온이 급격히 오르는 환경은 피하세요."
      },
      {
        id: 3,
        type: "고지혈증",
        caution: "기름진 음식을 먹은 직후에는 운동을 피하세요. 갑작스러운 무리한 운동은 피하고, 단계적으로 강도를 올리세요. 가슴 통증이나 호흡 곤란이 느껴지면 바로 운동을 중단하세요."
      }
    ];
    
    const testDisclaimer = disclaimer || "일반적 가이드이며 진단/치료가 아닙니다. 개별 건강 상태에 따라 전문가와 상담하세요.";
    
    const exerciseWithDiseases = {
      ...exercise,
      diseases: testDiseases,
      disclaimer: testDisclaimer
    };
    
    console.log("Exercise with diseases:", exerciseWithDiseases);
    
    // 운동 단계 페이지로 이동하며 운동 데이터와 만성질환 정보 전달
    navigate("/exercise-stage", {
      state: {
        exercise: exerciseWithDiseases,
      },
    });
  };


  // API 요청 함수
  const fetchExercisesForDate = useCallback(
    async (date) => {
      setLoading(true);
      setError(null);

      try {
        const dateString = date.toISOString().split("T")[0];

        // 저장된 컨디션 상태 사용
        const conditionData = {
          sleep: conditions.sleep,
          fatigue: conditions.fatigue,
          soreness: conditions.soreness,
        };

        const response = await ExerciseAPI.getRecommendationsByDate(dateString, conditionData);

        console.log("API Response:", response);
        console.log("Response data:", response.data);

        if (response.success && response.data?.cards) {
          setExercises(response.data.cards);
          setDiseases(response.data.diseases || []);
          setDisclaimer(response.data.disclaimer || "");
          
          console.log("Set diseases:", response.data.diseases);
          console.log("Set disclaimer:", response.data.disclaimer);
        } else {
          setError("운동 데이터를 불러올 수 없습니다.");
        }
      } catch (err) {
        console.error("운동 추천 API 호출 오류:", err);
        setError("운동 추천을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [conditions]
  );

  // 컨디션 상태를 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("exerciseConditions", JSON.stringify(conditions));
  }, [conditions]);

  // 선택된 날짜나 컨디션이 변경될 때마다 API 호출
  useEffect(() => {
    fetchExercisesForDate(selectedDate);
  }, [selectedDate, fetchExercisesForDate]);

  // 페이지가 다시 포커스될 때 진행률 업데이트를 위한 이벤트 리스너
  useEffect(() => {
    const handleFocus = () => {
      // 페이지가 다시 포커스될 때 운동 목록을 다시 렌더링하여 진행률 업데이트
      setExercises((prev) => [...prev]);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <CalenderPageWrapper>
      <Header>
        <BackButton onClick={handleBackClick}>
          <BackIcon src={backIcon} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>캘린더</HeaderTitle>
      </Header>

      <DateSection>
        <DateNavigation>
          <DateNavButton onClick={goToPreviousDate}>
            <DateNavIcon>‹</DateNavIcon>
          </DateNavButton>
          <DateDisplay>{formatDateKorean(selectedDate)}</DateDisplay>
          <DateNavButton onClick={goToNextDate}>
            <DateNavIcon>›</DateNavIcon>
          </DateNavButton>
        </DateNavigation>

        {loading && <LoadingText>운동 추천을 불러오는 중...</LoadingText>}

        {error && <ErrorText>{error}</ErrorText>}

        {!loading && !error && exercises.length > 0 && (
          <ExerciseList>
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.exerciseId}
                exercise={exercise}
                selectedDate={selectedDate}
                onClick={() => handleRetryExercise(exercise)}
              />
            ))}
          </ExerciseList>
        )}

        {!loading && !error && exercises.length === 0 && (
          <NoDataText>오늘의 추천 운동이 없습니다.</NoDataText>
        )}
      </DateSection>
    </CalenderPageWrapper>
  );
}

const CalenderPageWrapper = styled.div`
  min-height: 100vh;
  background: #f7f8fc;
  padding-bottom: 120px;
`;

const Header = styled.header`
  background: white;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const DateSection = styled.section`
  padding: 20px;
`;

const DateNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const DateNavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #e0e0e0;
  }
`;

const DateNavIcon = styled.span`
  font-size: 24px;
  color: #959595;
  font-weight: 300;
  line-height: 1;
`;

const DateDisplay = styled.h2`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

const LoadingText = styled.p`
  color: #666;
  font-family: Pretendard;
  font-size: 16px;
  text-align: center;
  margin: 40px 0;
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-family: Pretendard;
  font-size: 16px;
  text-align: center;
  margin: 40px 0;
`;

const NoDataText = styled.p`
  color: #666;
  font-family: Pretendard;
  font-size: 16px;
  text-align: center;
  margin: 40px 0;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

