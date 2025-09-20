import styled from "styled-components"
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const navigate =useNavigate();

    return(
        <Page>
            <Button onClick={navigate("/")}>운동 추천 받으러 가기</Button>
        </Page>
    )
}

const Page=styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

`
export const Button = styled.div`
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

  &:hover{
    cursor: pointer;
}
`;