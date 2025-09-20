import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import backIcon from "@icon/home/goBack.svg";
import { ExerciseAPI } from "../../shared/lib/api";
import ExerciseCard from "./ExerciseCard";

export default function ExerciseRecommendationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);

  // 컨디션 데이터를 location state에서 가져오거나 localStorage에서 가져오기
  const getConditionData = () => {
    let conditionData = null;
    
    if (location.state?.conditionData) {
      conditionData = location.state.conditionData;
    } else {
      // localStorage에서 컨디션 데이터 가져오기
      const savedConditions = localStorage.getItem("userConditions");
      if (savedConditions) {
        conditionData = JSON.parse(savedConditions);
      }
    }
    
    if (conditionData) {
      // UI 값(good/normal/bad)을 API 형식(GOOD/LOW/NONE)으로 변환
      const convertToApiFormat = (value) => {
        switch (value) {
          case "good": return "GOOD";
          case "normal": return "LOW";
          case "bad": return "NONE";
          default: return "GOOD";
        }
      };
      
      return {
        sleep: convertToApiFormat(conditionData.sleep),
        fatigue: convertToApiFormat(conditionData.fatigue),
        soreness: convertToApiFormat(conditionData.muscle) // muscle -> soreness
      };
    }
    
    return null;
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const conditionData = getConditionData();
        
        if (conditionData) {
          // 실제 API 호출
          console.log("API 요청 데이터:", conditionData);
          const response = await ExerciseAPI.getRecommendations(conditionData);
          console.log("API 응답:", response);
          
          // API 응답 구조에 맞춰 데이터 처리
          if (response.success && response.data && response.data.cards) {
            setExercises(response.data.cards);
          } else {
            throw new Error(response.message || "운동 추천 데이터를 가져올 수 없습니다.");
          }
        } else {
          // 컨디션 데이터가 없으면 기본값으로 API 호출
          const defaultConditionData = {
            sleep: "GOOD",
            fatigue: "LOW",
            soreness: "NONE"
          };
          const response = await ExerciseAPI.getRecommendations(defaultConditionData);
          
          if (response.success && response.data && response.data.cards) {
            setExercises(response.data.cards);
          } else {
            throw new Error(response.message || "운동 추천 데이터를 가져올 수 없습니다.");
          }
        }
      } catch (err) {
        console.error("운동 추천 조회 실패:", err);
        setError("운동 추천을 불러오는데 실패했습니다.");
        
        // 에러 시에도 임시 데이터 표시
        const mockExercises = [
          {
            exerciseId: 1,
            name: "스쿼트",
            sets: 3,
            value: 12,
            unit: "회"
          }
        ];
        setExercises(mockExercises);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleExerciseClick = (exerciseId) => {
    // 운동 상세 페이지로 이동 (나중에 구현)
    console.log("운동 클릭:", exerciseId);
  };

  if (loading) {
    return (
      <PageContainer>
        <Header>
          <BackButton onClick={handleBackClick}>
            <BackIcon src={backIcon} alt="뒤로가기" />
          </BackButton>
          <HeaderTitle>오늘의 맞춤 운동 추천</HeaderTitle>
        </Header>
        <LoadingContainer>
          <LoadingText>운동을 추천하고 있어요...</LoadingText>
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <BackIcon src={backIcon} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>오늘의 맞춤 운동 추천</HeaderTitle>
      </Header>
      
      <ContentContainer>
        <IntroSection>
          <IntroTitle>제일 필요한 운동이에요</IntroTitle>
          <IntroSubtitle>운동을 선택하면 단계별 설명이 나옵니다.</IntroSubtitle>
        </IntroSection>

        <ExerciseList>
          {exercises.map((exercise) => (
            <ExerciseCard 
              key={exercise.exerciseId} 
              exercise={exercise}
              onClick={handleExerciseClick}
            />
          ))}
        </ExerciseList>
      </ContentContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
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

const ContentContainer = styled.div`
  padding: 20px;
`;

const IntroSection = styled.div`
  margin-bottom: 24px;
`;

const IntroTitle = styled.h2`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

const IntroSubtitle = styled.p`
  color: #666;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const LoadingText = styled.p`
  color: #666;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
`;
