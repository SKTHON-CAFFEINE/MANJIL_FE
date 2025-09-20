// 운동 진행률 관리를 위한 유틸리티 함수들

/**
 * 운동 진행률을 localStorage에 저장
 * @param {string} exerciseId - 운동 ID
 * @param {number} currentCount - 현재 완료한 횟수
 * @param {number} totalCount - 목표 횟수
 * @param {string} date - 날짜 (YYYY-MM-DD 형식)
 */
export const saveExerciseProgress = (exerciseId, currentCount, totalCount, date) => {
  const key = `exercise_progress_${date}`;
  const existingData = getExerciseProgress(date) || {};
  
  existingData[exerciseId] = {
    currentCount,
    totalCount,
    percentage: Math.round((currentCount / totalCount) * 100),
    lastUpdated: new Date().toISOString()
  };
  
  localStorage.setItem(key, JSON.stringify(existingData));
};

/**
 * 특정 날짜의 운동 진행률을 가져오기
 * @param {string} date - 날짜 (YYYY-MM-DD 형식)
 * @returns {Object|null} 운동 진행률 데이터
 */
export const getExerciseProgress = (date) => {
  const key = `exercise_progress_${date}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

/**
 * 특정 운동의 진행률을 가져오기
 * @param {string} exerciseId - 운동 ID
 * @param {string} date - 날짜 (YYYY-MM-DD 형식)
 * @returns {Object|null} 운동 진행률 데이터
 */
export const getExerciseProgressById = (exerciseId, date) => {
  const allProgress = getExerciseProgress(date);
  return allProgress ? allProgress[exerciseId] : null;
};

/**
 * 운동 완료 상태 저장
 * @param {string} exerciseId - 운동 ID
 * @param {string} date - 날짜 (YYYY-MM-DD 형식)
 */
export const markExerciseComplete = (exerciseId, date) => {
  const key = `exercise_progress_${date}`;
  const existingData = getExerciseProgress(date) || {};
  
  if (existingData[exerciseId]) {
    existingData[exerciseId].isCompleted = true;
    existingData[exerciseId].completedAt = new Date().toISOString();
    existingData[exerciseId].percentage = 100;
  }
  
  localStorage.setItem(key, JSON.stringify(existingData));
};

/**
 * 운동 진행률 초기화 (운동 완료 후)
 * @param {string} exerciseId - 운동 ID
 * @param {string} date - 날짜 (YYYY-MM-DD 형식)
 */
export const resetExerciseProgress = (exerciseId, date) => {
  const key = `exercise_progress_${date}`;
  const existingData = getExerciseProgress(date) || {};
  
  delete existingData[exerciseId];
  
  localStorage.setItem(key, JSON.stringify(existingData));
};

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 * @param {Date} date - 날짜 객체
 * @returns {string} YYYY-MM-DD 형식의 날짜 문자열
 */
export const formatDateForStorage = (date) => {
  return date.toISOString().split('T')[0];
};
