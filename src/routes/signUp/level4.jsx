import { Page, PageName, Explain, State, StateGroup, Button, Level, LevelBox } from "./signUpStyle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Level4() {
  const [state, setState] = useState([false, false, false, false, false]);
      const navigate = useNavigate();
  const nextLevel = () => {
    navigate("/auth/signUp");
  };

  const stateChange = (s) => {
    switch (s) {
      case 1: {
        const newState = [...state];
        // 0번째 값만 수정
        newState[0] = !newState[0]; // 원하는 값으로 바꿔주기
        // 업데이트
        setState(newState);
        break;
      }
      case 2: {
        const newState = [...state];
        // 0번째 값만 수정
        newState[1] = !newState[1]; // 원하는 값으로 바꿔주기
        // 업데이트
        setState(newState);
        break;
      }
      case 3: {
        const newState = [...state];
        // 0번째 값만 수정
        newState[2] = !newState[2]; // 원하는 값으로 바꿔주기
        // 업데이트
        setState(newState);
        break;
      }
      case 4: {
        const newState = [...state];
        // 0번째 값만 수정
        newState[3] = !newState[3]; // 원하는 값으로 바꿔주기
        // 업데이트
        setState(newState);
        break;
      }
      case 5: {
        const newState = [...state];
        // 0번째 값만 수정
        newState[4] = !newState[4]; // 원하는 값으로 바꿔주기
        // 업데이트
        setState(newState);
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
        <Level $on={true}/>
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
