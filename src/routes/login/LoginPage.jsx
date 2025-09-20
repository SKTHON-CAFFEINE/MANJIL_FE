import styled from "styled-components";
import logo from "../../shared/assets/icon/Text_Logo.svg";
import { APIService } from "../../shared/lib/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate=useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fail, setFail] = useState(false);

  const login = async () => {
    try {
      // API 호출 시 두 번째 인자로 이메일과 비밀번호를 담은 객체를 전달
      const response = await APIService.public.post("/auth/login", {
        email: email, // 또는 간단히 email
        password: password, // 또는 간단히 password
      });
      console.log("로그인 성공:", response);
      const token = response.headers["authorization"]?.split(" ")[1];
      if (token) {
        localStorage.setItem("accessToken", token);
        navigate("/");
      }
      
      return response;
    } catch (error) {
      console.error("로그인 실패:", error);
      setFail(1);
    }
  };

  return (
    <Page>
      <img src={logo} style={{ marginTop: "107px", marginBottom: "41px" }} />
      <Group>
        <Box>
          <Text>이메일</Text>
          <Input
            placeholder="manjil@skuniv.ac.kr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <Text>비밀번호</Text>
          <Input
            placeholder="영문, 숫자, 특수기호 조합, 8~20자"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </Group>
      {fail && <Fail>이메일 또는 비밀번호가 올바르지 않습니다. </Fail>}
      <Button onClick={() => login()}>로그인</Button>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Text = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Input = styled.input`
  width: 334px;
  height: 57px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #cdcdcd;
  padding-left: 21px;

  &::placeholder {
    color: #b1b0b0;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Fail = styled.div`
  width: 334px;
  flex-shrink: 0;
  margin-top: 10px;

  color: var(--Negative-Color, #eb4335);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
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
  margin-top: auto;
  margin-bottom: 37px;

  color: #fff;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 22px */
  letter-spacing: -0.44px;
`;
