import { Page, PageName, Explain, State, StateGroup, Button, Level, LevelBox } from "./signUpStyle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { APIService } from "../../shared/lib/api";

export default function Level4() {
  const [state, setState] = useState([false, false, false, false, false]);
  const navigate = useNavigate();
  const { step1, step2, step3,step4, resetForm,addDisease, removeDisease } = useAuthStore();
    const formData = {
    ...step1,
    ...step2,
    ...step3,
    ...step4,
  };

  const nextLevel =async () => {
    try{
    const response=await APIService.public.post("/users/register",formData);
    console.log('회원가입 성공:', response);
    resetForm();
    navigate("/auth/signUp");
    } catch(error){
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  const stateChange = (s) => {
    switch (s) {
      case 1: {
        const newState = [...state];
        newState[0] = !newState[0];
        setState(newState);
        if (newState[0]) {
          addDisease(1);
        } else {
          removeDisease(1);
        }
        break;
      }
      case 2: {
        const newState = [...state];
        // 0번째 값만 수정
        newState[1] = !newState[1]; // 원하는 값으로 바꿔주기
        // 업데이트
        setState(newState);
        if (newState[1]) {
          addDisease(2);
        } else {
          removeDisease(2);
        }
        break;
      }
      case 3: {
        const newState = [...state];
        newState[2] = !newState[2];
        setState(newState);
        if (newState[2]) {
          addDisease(3);
        } else {
          removeDisease(3);
        }
        break;
      }
      case 4: {
        const newState = [...state];
        newState[3] = !newState[3];
        setState(newState);
        if (newState[3]) {
          addDisease(1);
        } else {
          removeDisease(1);
        }
        break;
      }
      case 5: {
        const newState = [...state];
        newState[4] = !newState[4];
        setState(newState);
        if (newState[4]) {
          addDisease(1);
        } else {
          removeDisease(1);
        }
        break;
      }
    }
  };
  return (
    <Page>
      <LevelBox>
        <Level $on={true} />
        <Level $on={true} />
        <Level $on={true} />
        <Level $on={true} />
      </LevelBox>
      <PageName>
        현재 관리 중이신 질환이 <br />
        있다면 선택해주세요.
      </PageName>
      <Explain>중복 선택할 수 있어요</Explain>
      <StateGroup>
        <State onClick={() => stateChange(1)} $on={state[0]}>
          고혈압
        </State>
        <State onClick={() => stateChange(2)} $on={state[1]}>
          당뇨병
        </State>
        <State onClick={() => stateChange(3)} $on={state[2]}>
          고지혈증
        </State>
        <State onClick={() => stateChange(4)} $on={state[3]}>
          관절염
        </State>
        <State onClick={() => stateChange(5)} $on={state[4]}>
          골다공증
        </State>
      </StateGroup>
      <Button onClick={() => nextLevel()}>다음</Button>
    </Page>
  );
}
