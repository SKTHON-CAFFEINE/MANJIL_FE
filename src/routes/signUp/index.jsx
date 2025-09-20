import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import text_logo from "../../shared/assets/icon/white_Text_Logo.svg";
import logo from "../../shared/assets/icon/logo.svg";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <Page>
      <img src={text_logo} style={{ marginTop: "82px", marginBottom: "15px" }} />
      <Slogun>만성질환 4060세대를 위한 AI 운동 추천 플랫폼</Slogun>
      <img src={logo} />
      <Button onClick={()=>navigate("/")}>운동 추천 받으러 가기</Button>
    </Page>
  );
}

const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2f6eee;
`;
const Slogun = styled.div`
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 55px;
`;
export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 335px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  margin-top: 62px;

  color: #2f6eee;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 22px */
  letter-spacing: -0.44px;

  &:hover {
    cursor: pointer;
  }
`;
