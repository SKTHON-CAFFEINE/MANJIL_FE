import styled from "styled-components";
import text_logo from "../../shared/assets/icon/Text_Logo.svg";
import logo from "../../shared/assets/icon/logo.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function StartPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000); // 2초 후 사라짐
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <Motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
        >
          <Page>
            <img src={logo} />
            <img src={text_logo} style={{ marginTop: "25px" }} />
          </Page>
        </Motion.div>
      ) : (
        <Page>
          <img src={text_logo} style={{ marginTop: "100px",marginBottom:"15px" , width:"200px"}} />
          <Slogun>만성질환 4060세대를 위한 AI 운동 추천 플랫폼</Slogun>
          <img src={logo} />
          <ButtonGroup>
            <Button onClick={() => navigate("/auth")}>로그인</Button>
            <SignUp onClick={() => navigate("/auth/signUp/level1")}>회원가입</SignUp>
          </ButtonGroup>
        </Page>
      )}
    </AnimatePresence>
  );
}

const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Slogun = styled.div`
  color: #2f6eee;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 65px;
`;
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
