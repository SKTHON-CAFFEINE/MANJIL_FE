import { Page, PageName, Button, Level, LevelBox, StateGroup, State } from "./signUpStyle";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

export default function Level3() {
  const navigate = useNavigate();
  const { step3, setStep3Data } = useAuthStore();

  const nextLevel = () => {
    navigate("/auth/signUp/level4");
  };

  const stateChange = (s) => {
    setStep3Data({fitnessLevel:s});
  };
  return (
    <Page>
      <LevelBox>
        <Level $on={true} />
        <Level $on={true} />
        <Level $on={true} />
        <Level />
      </LevelBox>
      <PageName>
        본인의 체력 수준을 <br />
        선택해주세요.
      </PageName>
      <div style={{ height: "64px" }} />
      <StateGroup>
        <State onClick={() => stateChange(1)} $on={step3.fitnessLevel == 1 ? 1 : 0}>
          가벼운 스트레칭은 괜찮아요
        </State>
        <State onClick={() => stateChange(2)} $on={step3.fitnessLevel == 2 ? 1 : 0}>
          간단한 근력 운동도 가능해요
        </State>
        <State onClick={() => stateChange(3)} $on={step3.fitnessLevel == 3 ? 1 : 0}>
          꾸준히 운동할 수 있어요
        </State>
        <State onClick={() => stateChange(4)} $on={step3.fitnessLevel == 4 ? 1 : 0}>
          활발하게 운동하고 있어요
        </State>
      </StateGroup>
      <Button onClick={() => nextLevel()}>다음</Button>
    </Page>
  );
}
