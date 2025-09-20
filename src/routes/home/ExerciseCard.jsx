import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function ExerciseCard({ exercise, onClick }) {
  const navigate = useNavigate();

  const handleDetailClick = (e) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지
    navigate("/exercise-stage", {
      state: {
        exercise: exercise,
      },
    });
  };

  // 안전한 이미지 URL 추출
  const getImageUrl = () => {
    if (!exercise) return "/api/placeholder/100/100";
    
    // API 응답 구조에 맞게 details[0].imageUrl 우선 사용
    return exercise.details?.[0]?.imageUrl || 
           exercise.details?.[1]?.imageUrl ||
           exercise.imageUrl || 
           exercise.image ||
           "/api/placeholder/100/100";
  };

  return (
    <ExerciseCardWrapper onClick={() => onClick(exercise)}>
      <CardFirstSection>
        <ExerciseImage
          src={getImageUrl()}
          alt={exercise?.name || "운동"}
        />
        <ExerciseName>
          {exercise?.name || "운동"} {exercise?.reps || 0}
          {exercise?.unit || "회"}
        </ExerciseName>
      </CardFirstSection>
      <ExerciseInfo>
        <ExerciseAdvantage>{exercise?.advantages || "건강에 좋은 운동입니다."}</ExerciseAdvantage>
        <DetailButton onClick={handleDetailClick}>자세히 보기</DetailButton>
      </ExerciseInfo>
    </ExerciseCardWrapper>
  );
}

const ExerciseCardWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ExerciseImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  background: #f0f0f0;
`;

const ExerciseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const CardFirstSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const ExerciseName = styled.h3`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  text-align: center;
`;

const ExerciseIntensity = styled.p`
  color: #2f6eee;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-align: center;
`;

const ExerciseAdvantage = styled.p`
  color: #666;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  text-align: center;
`;

const DetailButton = styled.button`
  background: #2f6eee;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: Pretendard;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;

  &:hover {
    background: #1e4bb8;
  }
`;
