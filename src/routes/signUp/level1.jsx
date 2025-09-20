import {
    PageName,
  InputGroup,
  Box,
  Text,
  Input,
  Fail,
  Button
} from "./signUpStyle";
export default function Level1({setLevel}) {
  return (
    <>
    <PageName>회원가입</PageName>
      <InputGroup>
        <Box>
          <Text>이메일</Text>
          <Input placeholder="이메일을 입력하세요." />
          <Fail>이메일 양식에 맞지 않습니다.</Fail>
        </Box>
        <Box>
          <Text>비밀번호</Text>
          <Input placeholder="비밀번호를 입력하세요." />
          <Fail>비밀번호 형식에 맞지 않습니다.</Fail>
        </Box>
      </InputGroup>
      <Button onClick={()=>setLevel(2)}>다음</Button>
    </>
  );
}
