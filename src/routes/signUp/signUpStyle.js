import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
export const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 26px;
  margin-bottom: 60px;
`;
export const Level = styled.div`
  width: 72px;
  height: 5px;
  flex-shrink: 0;

  border-radius: 2px;
  background: ${({ $on }) => ($on ? "#2F6EEE" : "#D9D9D9")};
`;
export const PageName=styled.div`
width: 334px;
  color: #000;
font-family: Pretendard;
font-size: 30px;
font-style: normal;
font-weight: 700;
line-height: 100%; /* 30px */
letter-spacing: -0.6px;
text-align: left;
`
export const InputGroup=styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 32px;
`
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const Text = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const Input = styled.input`
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
  
  &:focus {
    outline: none;
  }
`;
export const Fail = styled.div`
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
export const StateGroup=styled.div`
display: flex;
flex-direction: column;
gap: 20px;
`
export const State=styled.div`
width: 334px;
height: 57px;
flex-shrink: 0;
display: flex;
justify-content: center;
align-items: center;

border-radius: 8px;
border: 1px solid ${({$on})=>$on ? "#2F6EEE":"#CDCDCD"};
background-color: ${({$on})=>$on ? "#F2F6FF":"#ffff"};

color: ${({$on})=>$on ? "#2F6EEE":"#000"};
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;

&:hover{
    cursor: pointer;
}
`
export const Explain=styled.div`
width: 334px;
margin-top: 9px;
margin-bottom: 26px;

color: #797979;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 135%; /* 27px */
letter-spacing: -0.4px;
`