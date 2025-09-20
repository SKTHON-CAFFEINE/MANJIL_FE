import {
  Page,
  PageName,
  InputGroup,
  Box,
  Text,
  Input,
  Fail,
  Button,
  Level,
  LevelBox,
} from "./signUpStyle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIService } from "../../shared/lib/api";
import useAuthStore from "../stores/authStore";

export default function Level1() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fail, setFail] = useState(0);
  const { setStep1Data } = useAuthStore();

  const nextLevel = async () => {
    try {
      const response = await APIService.private.post("/users/valid", {
        email: email, // 또는 간단히 email
        password: password, // 또는 간단히 password
      });
      console.log("로그인 성공:", response);
      setStep1Data({ email: email, password: password });
      navigate("/auth/signUp/level2");
    } catch (error) {
      console.error("로그인 실패:", error);
      if (error.response) {
        const { message } = error.response.data;

        // HTTP 상태 코드와 메시지를 활용
        if (message === "이메일 형식이 올바르지 않습니다.") {
          setFail(1);
        } else if (message === "비밀번호 형식이 올바르지 않습니다.") {
          setFail(2);
        } else if (message === "이메일과 비밀번호 형식이 모두 올바르지 않습니다.") {
          setFail(3);
        }
      } else if (error.request) {
        // 서버에 요청이 전달되지 않은 경우 (네트워크 오류 등)
        alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
      } else {
        // 그 외 알 수 없는 오류
        alert("로그인 요청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Page>
      <LevelBox>
        <Level $on={true} />
        <Level />
        <Level />
        <Level />
      </LevelBox>
      <PageName>회원가입</PageName>
      <InputGroup>
        <Box>
          <Text>이메일</Text>
          <Input
            placeholder="manjil@skuniv.ac.kr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {(fail == 1 || fail == 3) && <Fail>이메일 양식에 맞지 않습니다.</Fail>}
        </Box>
        <Box>
          <Text>비밀번호</Text>
          <Input
            type="password"
            placeholder="영문, 숫자, 특수기호 조합, 8~20자"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {(fail == 2 || fail == 3) && <Fail>비밀번호 형식에 맞지 않습니다.</Fail>}
        </Box>
      </InputGroup>
      <Button onClick={() => nextLevel()}>다음</Button>
    </Page>
  );
}
