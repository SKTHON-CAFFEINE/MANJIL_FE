import {
  Page,
  PageName,
  InputGroup,
  Box,
  Text,
  Input,
  Button,
  Level,
  LevelBox,
} from "./signUpStyle";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Level2() {
  const [gender, setGender] = useState();
  const navigate = useNavigate();
  const nextLevel = () => {
    navigate("/auth/signUp/level3");
  };

  return (
    <Page>
      <LevelBox>
        <Level $on={true} />
        <Level $on={true} />
        <Level />
        <Level />
      </LevelBox>
      <PageName>회원가입</PageName>
      <InputGroup>
        <Box>
          <Text>이름</Text>
          <Input placeholder="이름을 입력하세요" />
        </Box>
        <Box>
          <Text>성별</Text>
          <GenderGroup>
            <Gender onClick={() => setGender(0)} $on={gender ? 0 : 1}>
              여성
            </Gender>
            <Gender onClick={() => setGender(1)} $on={gender ? 1 : 0}>
              남성
            </Gender>
          </GenderGroup>
        </Box>
        <Box>
          <Text>나이</Text>
          <AgeGroup>
            <Age />
            <Text>세</Text>
          </AgeGroup>
        </Box>
      </InputGroup>
      <Button onClick={() => nextLevel()}>다음</Button>
    </Page>
  );
}

const GenderGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Gender = styled.div`
  display: flex;
  width: 162px;
  height: 57px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid ${({ $on }) => ($on ? "#2F6EEE" : "#CDCDCD")};
  justify-content: center;
  align-items: center;
  background-color: ${({ $on }) => ($on ? "#F2F6FF" : "#ffff")};
  color: ${({ $on }) => ($on ? "#2F6EEE" : "#B1B0B0")};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: ${({ $on }) => ($on ? "600" : "400")};
  line-height: normal;

  &:hover {
    cursor: pointer;
  }
`;
const AgeGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;

  align-items: center;
`;
const Age = styled.input`
  width: 161px;
  height: 57px;
  flex-shrink: 0;
  text-align: center;

  border-radius: 8px;
  border: 1px solid #cdcdcd;
  &:focus {
    outline: none;
  }
`;
