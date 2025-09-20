import styled from "styled-components";
import text_logo from "../../shared/assets/icon/Text_Logo.svg";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <img src={text_logo} style={{ marginTop: "107px", marginBottom: "41px" }} />
      <Slogun>슬로건이요</Slogun>
      <ButtonGroup>
        <Button onClick={() => navigate("/auth")}>로그인</Button>
        <SignUp onClick={() => navigate("/auth/signUp/level1")}>회원가입</SignUp>
      </ButtonGroup>
    </Page>
  );
}

const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Slogun = styled.div``;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: 100px;
  align-items: center;
  gap: 36px;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 335px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #2f6eee;

  color: #fff;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 22px */
  letter-spacing: -0.44px;
`;
const SignUp = styled.div`
  color: #2f6eee;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 20px */
  letter-spacing: -0.4px;
`;
