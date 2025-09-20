import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import backIcon from "@icon/home/goBack.svg";

export default function StageExercisePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const exercise = location.state?.exercise;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleStartExercise = () => {
    // 운동 시작 로직 (나중에 구현)
    console.log("운동 시작:", exercise);
  };

  if (!exercise) {
    return (
      <PageContainer>
        <Header>
          <BackButton onClick={handleBackClick}>
            <BackIcon src={backIcon} alt="뒤로가기" />
          </BackButton>
          <HeaderTitle>운동 상세</HeaderTitle>
        </Header>
        <ErrorContainer>
          <ErrorText>운동 정보를 찾을 수 없습니다.</ErrorText>
        </ErrorContainer>
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
        <ExerciseCard>
          <ExerciseTitle>{exercise.name} {exercise.duration}분</ExerciseTitle>
          
          <StepsContainer>
            {exercise.steps?.map((step, index) => (
              <StepContainer key={index}>
                <StepNumber>{index + 1}단계</StepNumber>
                <StepImage src={step.image} alt={`${index + 1}단계`} />
                <StepDescription>{step.description}</StepDescription>
                {index === 0 && (
                  <StartButton onClick={handleStartExercise}>
                    운동 시작
                  </StartButton>
                )}
              </StepContainer>
            ))}
          </StepsContainer>
        </ExerciseCard>
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

const ExerciseCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const ExerciseTitle = styled.h2`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 24px 0;
  text-align: center;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
`;

const StepNumber = styled.h3`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  align-self: flex-start;
`;

const StepImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  background: #f0f0f0;
`;

const StepDescription = styled.p`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  text-align: center;
  max-width: 300px;
`;

const StartButton = styled.button`
  background: #2f6eee;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 16px;

  &:hover {
    background: #1e4bb8;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const ErrorText = styled.p`
  color: #666;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
`;
