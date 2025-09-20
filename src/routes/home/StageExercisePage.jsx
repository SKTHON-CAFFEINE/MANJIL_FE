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
    navigate("/exercise-vertify");
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
        <ExerciseTitle>
          {exercise.name} {exercise.reps}
          {exercise.unit}
        </ExerciseTitle>

        {/* 단계별 카드가 각각 독립된 하얀 박스 */}
        {exercise?.details?.map((detail, index) => (
          <StepCard key={detail.id ?? index}>
            <StepBadge>단계별 운동 방법</StepBadge>

            <StepNumber>{index + 1}단계</StepNumber>

            <StepImageWrapper>
              <StepImage
                src={detail.imageUrl || "/api/placeholder/280/180"}
                alt={`${exercise.name} ${index + 1}단계`}
              />
            </StepImageWrapper>

            <StepDescription>{detail.description}</StepDescription>
          </StepCard>
        ))}

        <CautionCard>
          <CautionTitle>주의사항</CautionTitle>
          {exercise?.diseases?.map((disease, index) => (
            <CautionText key={disease.id ?? index}>
              {index + 1}. {disease.type}: {disease.caution || "특별한 주의사항이 없습니다."}
            </CautionText>
          ))}
          {(!exercise?.diseases || exercise.diseases.length === 0) && (
            <CautionText>특별한 주의사항이 없습니다.</CautionText>
          )}
        </CautionCard>

        <StartButton onClick={handleStartExercise}>운동 시작</StartButton>
      </ContentContainer>
    </PageContainer>
  );
}
const PageContainer = styled.div`
  min-height: 100vh;
  background: #f7f8fc;
  padding-bottom: 100px;
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

const ContentContainer = styled.div`
  padding: 20px;
`;

const ExerciseTitle = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 34px; /* 141.667% */
  margin-bottom: 17px;
`;

const StepCard = styled.section`
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 25px;
`;

const StepBadge = styled.span`
  position: absolute;
  top: 14px;
  left: 16px;
  background: #f2f6ff;
  color: #0f1a33;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
`;

const StepNumber = styled.h3`
  margin: 42px 0 8px 0; /* 배지 밑으로 여백 */
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 116.667% */
`;

const StepImageWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px; /* 이미지 주변 여백 */
  margin: 4px 0 12px 0;
`;

const StepImage = styled.img`
  width: 100%;
  border-radius: 12px;
  background: #f3f5f8;
`;

const StepDescription = styled.p`
  margin: 0;
  text-align: left; /* 첫 번째 예시처럼 좌측 정렬 */
  line-height: 1.6;
  font-family: Pretendard;
  font-size: 15px;
  color: #1a1a1a;
`;

const StartButton = styled.button`
  background: #2f6eee;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 16px 24px;
  font-family: Pretendard;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  box-shadow: 0 6px 16px rgba(47, 110, 238, 0.22);
  transition: transform 0.02s ease, background-color 0.2s ease;

  &:active {
    transform: translateY(1px);
  }
  &:hover {
    background: #1e4bb8;
  }
`;

const ErrorContainer = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ErrorText = styled.p`
  color: #666;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
`;

const CautionCard = styled.div`
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 25px;
  margin-top: 25px;
`;

const CautionTitle = styled.h3`
  margin: 0 0 12px 0;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
`;

const CautionText = styled.p`
  margin: 0 0 8px 0;
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }
`;
