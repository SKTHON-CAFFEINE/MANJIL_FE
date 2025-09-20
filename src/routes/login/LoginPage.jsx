import styled from "styled-components";
import logo from "../../shared/assets/icon/Text_Logo.svg";

export default function LoginPage() {
  return (
    <Page>
      <img src={logo} style={{ marginTop: "107px", marginBottom: "41px" }} />
      <Group>
      <Box>
        <Text>이메일</Text>
        <Input placeholder="이메일을 입력하세요." />
      </Box>
      <Box>
        <Text>비밀번호</Text>
        <Input placeholder="비밀번호를 입력하세요." />
      </Box>
      </Group>
      <Fail>이메일 또는 비밀번호가 올바르지 않습니다. </Fail>
      <Button>로그인</Button>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const Group=styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`
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
