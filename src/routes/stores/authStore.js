import { create } from "zustand";

// 회원가입 폼 데이터를 위한 스토어 생성
const useAuthStore = create((set) => ({
  // 스텝별 상태들
  step1: {
    email: "",
    password: "",
  },
  step2: {
    username: "",
    gender: "",
    age: "",
  },
  step3: {
    fitnessLevel: "",
  },
  step4: {
    diseaseIds: [],
  },
  addDisease: (num) =>
    set((state) => ({
      step4: {
        ...state.step4,
        diseaseIds: state.step4.diseaseIds.includes(num)
          ? state.step4.diseaseIds
          : [...state.step4.diseaseIds, num],
      },
    })),

  // 숫자 제거
  removeDisease: (num) =>
    set((state) => ({
      step4: {
        ...state.step4,
        diseaseIds: state.step4.diseaseIds.filter((d) => d !== num),
      },
    })),

  // 상태를 업데이트하는 액션
  // `set` 함수를 사용하여 특정 스텝의 데이터만 업데이트
  setStep1Data: (data) => set((state) => ({ step1: { ...state.step1, ...data } })),
  setStep2Data: (data) => set((state) => ({ step2: { ...state.step2, ...data } })),
  setStep3Data: (data) => set((state) => ({ step3: { ...state.step3, ...data } })),
  setStep4Data: (data) => set((state) => ({ step3: { ...state.step4, ...data } })),

  // 전체 상태를 초기화하는 액션 (회원가입 완료 또는 취소 시 사용)
  resetForm: () =>
    set({
      step1: { email: "", password: "" },
      step2: { username: "", gender: "", age: "" },
      step3: { fitnessLevel: "" },
      step4: { diseaseIds: [] },
    }),
}));

export default useAuthStore;
