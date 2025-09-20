import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function ExerciseCard({ exercise, onClick }) {
  const navigate = useNavigate();

  return (
    <ExerciseCardWrapper onClick={() => onClick(exercise.exerciseId)}>
      <CardFirstSection>
        <ExerciseImage src="/api/placeholder/100/100" alt={exercise.name} />
        <ExerciseName>
          {exercise.name} {exercise.value}
          {exercise.unit}
        </ExerciseName>
      </CardFirstSection>
      <ExerciseInfo>
        <ExerciseWarning>무거운 근력 운동, 갑작스러운 전력질주,</ExerciseWarning>
        <ExerciseWarning>점프 동작은 피하세요.</ExerciseWarning>
        <DetailButton onClick={() => navigate("/exercise-stage")}>자세히 보기</DetailButton>
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

const ExerciseWarning = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%; /* 24.3px */
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
