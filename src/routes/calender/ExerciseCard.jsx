import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getExerciseProgressById, formatDateForStorage } from "../../shared/lib/exerciseProgress";

export default function ExerciseCard({ exercise, onClick, selectedDate }) {
  const navigate = useNavigate();

  // 개별 운동 진행률 계산
  const calculateExerciseProgress = (exercise) => {
    const dateString = formatDateForStorage(selectedDate);
    const savedProgress = getExerciseProgressById(exercise.exerciseId, dateString);

    let currentReps = 0;
    let percentage = 0;

    if (savedProgress) {
      if (savedProgress.isCompleted) {
        // 운동이 완료된 경우
        currentReps = exercise.reps;
        percentage = 100;
      } else {
        // 운동이 진행 중인 경우
        currentReps = savedProgress.currentCount || 0;
        percentage = savedProgress.percentage || 0;
      }
    }

    const totalReps = exercise.reps;

    return { current: currentReps, total: totalReps, percentage };
  };

  // 오늘 날짜인지 확인
  const isToday = () => {
    const today = new Date();
    const selected = new Date(selectedDate);
    return today.toDateString() === selected.toDateString();
  };

  return (
    <ExerciseCardWrapper onClick={onClick}>
      <ExerciseInfo>
        <ExerciseName>{exercise.name}</ExerciseName>
        <ExerciseReps>
          {exercise.reps}
          {exercise.unit}
        </ExerciseReps>
      </ExerciseInfo>

      {exercise.details && exercise.details.length > 0 && (
        <ExerciseImage src={exercise.details[0].imageUrl} alt={exercise.name} />
      )}

      {/* 오늘 날짜일 때만 각 운동별 진행률과 버튼 표시 */}
      {isToday() && (
        <>
          <ExerciseProgressBar>
            <ProgressSection>
              <InitialCount>0</InitialCount>
              <ExerciseProgressText>
                <ExerciseCurrentProgress>
                  {calculateExerciseProgress(exercise).current}
                </ExerciseCurrentProgress>
                <ExerciseProgressDivider>
                  {" "}
                  / {calculateExerciseProgress(exercise).total}
                </ExerciseProgressDivider>
              </ExerciseProgressText>
            </ProgressSection>
            <ExerciseProgressBarContainer>
              <ExerciseProgressBarFill
                percentage={calculateExerciseProgress(exercise).percentage}
              />
            </ExerciseProgressBarContainer>
          </ExerciseProgressBar>
           <ExerciseRetryButton
             onClick={(e) => {
               e.stopPropagation();
               if (onClick) {
                 onClick(exercise);
               } else {
                 navigate("/exercise-stage", {
                   state: {
                     exercise: exercise,
                   },
                 });
               }
             }}
           >
            맞춤 운동 다시하기
          </ExerciseRetryButton>
        </>
      )}
    </ExerciseCardWrapper>
  );
}

const ExerciseCardWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ExerciseName = styled.h3`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 25px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const ExerciseReps = styled.p`
  color: #427bf0;
  font-family: Pretendard;
  font-size: 25px;
  font-weight: 600;
  margin: 0 0 12px 0;
`;

const ExerciseImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  object-fit: contain;
  margin: 12px 0;
  background-color: #fafcfd;
`;

const ExerciseProgressBar = styled.div`
  margin: 16px 0;
`;

const ExerciseProgressText = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 8px;
`;

const ExerciseCurrentProgress = styled.span`
  color: #427bf0;
  font-family: Pretendard;
  font-size: 35px;
  font-weight: 700;
`;

const ExerciseProgressDivider = styled.span`
  color: #959595;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
`;

const ExerciseProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
`;

const ExerciseProgressBarFill = styled.div`
  width: ${(props) => props.percentage}%;
  height: 100%;
  background-color: #427bf0;
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const ExerciseRetryButton = styled.button`
  width: 100%;
  background-color: #427bf0;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 12px;

  &:hover {
    background-color: #3366cc;
  }

  &:active {
    background-color: #2952a3;
  }
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InitialCount = styled.span`
  color: #959595;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
`;

const ExerciseInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
