import styled from "styled-components";
import smile from "../../shared/assets/icon/home/smile.svg";
import sad from "../../shared/assets/icon/home/sad.svg";
import angry from "../../shared/assets/icon/home/angry.svg";
import step from "../../shared/assets/icon/report/report_condition_step.svg";
import gold_badge from "../../shared/assets/icon/home/badge.svg";
import silver_badge from "../../shared/assets/icon/report/silver_badge.svg";
import bronze_badge from "../../shared/assets/icon/report/bronze_badge.svg";
import left_button from "../../shared/assets/icon/report/beforepage_button.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReportPage() {
  const navigate=useNavigate();
  const [condition, setCondition] = useState();

  const select = (s) => {
    setCondition(s);
  };

  return (
    <Page>
      <Header>
        <img
          src={left_button}
          style={{ marginRight: "auto", marginLeft: "28px", height: "17px", width: "8px" }}
          onClick={()=>navigate(-1)}
        />
        <p style={{ marginRight: "110px" }}>운동 완료 리포트</p>
      </Header>
      <ConditionBox $h="250px">
        <ConditionText>운동 후 몸상태는 어떠세요?</ConditionText>
        <CardGroup>
          <ConditionCard>
            <img src={smile} style={{ width: "57px", height: "57px" }} />
            <ConditionButton onClick={() => select(1)} $on={condition == 1 ? 1 : 0}>
              좋아요
            </ConditionButton>
          </ConditionCard>
          <ConditionCard>
            <img src={sad} style={{ width: "57px", height: "57px" }} />
            <ConditionButton onClick={() => select(2)} $on={condition == 2 ? 1 : 0}>
              그냥그래요
            </ConditionButton>
          </ConditionCard>
          <ConditionCard>
            <img src={angry} style={{ width: "57px", height: "57px" }} />
            <ConditionButton onClick={() => select(3)} $on={condition == 3 ? 1 : 0}>
              별로에요
            </ConditionButton>
          </ConditionCard>
        </CardGroup>
        <img src={step} style={{ marginBottom: "20px", marginTop: "auto" }} />
      </ConditionBox>
      <ConditionBox $h="292px">
        <PointTextBox>
        <PointText $w="182px">
          획득한 포인트
        </PointText>
        <PointText $w="152px">
          : +20 point
        </PointText>
        </PointTextBox>
        <Bar />
        <TodayPointText $s="24px">오늘 운동으로 획득한 포인트</TodayPointText>
        <TodayPointText $s="22px">
          스쿼트 30회 완료: 10포인트
          <br />
          걷기 20분 완료: 10포인트
        </TodayPointText>
      </ConditionBox>
      <ConditionBox $h="478px">
        <RankingText>랭킹 확인해보세요!</RankingText>
        <UserBox>
          <UserCard>
            <img src={gold_badge} style={{ width: "75px", height: "75px" }} />
            <UserText $s="20px">홍길동</UserText>
            <UserText $s="16px">1200p</UserText>
            <UserText $s="16px">+40p</UserText>
          </UserCard>
          <UserCard>
            <img src={gold_badge} style={{ width: "75px", height: "75px" }} />
            <UserText $s="20px">김영희</UserText>
            <UserText $s="16px">1160p</UserText>
            <UserText $s="16px">+30p</UserText>
          </UserCard>
          <UserCard>
            <img src={silver_badge} style={{ width: "75px", height: "75px" }} />
            <UserText $s="20px">이탱화</UserText>
            <UserText $s="16px">1010p</UserText>
            <UserText $s="16px">+30p</UserText>
          </UserCard>
        </UserBox>
        <Bar />
        <MyCard>
          <img src={bronze_badge} style={{ width: "75px", height: "75px" }} />
          <UserText $s="20px">나</UserText>
          <UserText $s="16px">370p</UserText>
          <UserText $s="16px">+20p</UserText>
        </MyCard>
        <Text $s="18px">열심히 포인트를 모아 사용해보세요!</Text>
      </ConditionBox>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  white-space: nowrap;
  scrollbar-width: none; /* Firefox */
  gap: 25px;
  padding-bottom: 100px;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 56px;
  flex-shrink: 0;
  background: #fff;
  color: #111827;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%; /* 32.4px */
`;
const ConditionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 334px;
  height: ${({ $h }) => $h};
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
`;
const ConditionText = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 87.5% */
  margin-top: 23px;
`;
const CardGroup = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 14px;
`;
const ConditionCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  align-items: center;
`;
const ConditionButton = styled.div`
  display: flex;
  width: 90px;
  height: 29px;
  flex-shrink: 0;
  border-radius: 6px;
  background: ${({ $on }) => ($on ? "#2F6EEE" : "#a4a4a4")};
  justify-content: center;
  align-items: center;

  color: #fff;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 131.25% */

  &:hover{
    cursor: pointer;
  }
`;
const PointTextBox=styled.div`
  display: flex;
  flex-direction: column;
    width: 267px;
    margin-bottom: 20px;
    margin-top: 20px;
`
const PointText = styled.div`
width: ${({ $w }) => $w};
  color: #000;
  font-family: Roboto;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  text-align: left;
    background-image: linear-gradient(
    transparent 50%, 
    #2F6EEE26 50%   
  );
`;
const TodayPointText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: ${({ $s }) => $s};
  font-style: normal;
  font-weight: 500;
  line-height: 30.081px; /* 125.338% */
  margin-top: 22px;
  text-align: left;
  width: 267px;
`;
const Bar = styled.div`
  width: 295px;
  height: 1px;
  flex-shrink: 0;
  background-color: #e7e7e7;
`;
const RankingText = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 87.5% */
  text-align: left;
  width: 284px;
  margin-top: 33px;
  margin-bottom: 20px;
`;
const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const UserText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: ${({ $s }) => $s};
  font-style: normal;
  font-weight: 500;
  line-height: 13.332px; /* 66.661% */
`;
const MyCard = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
  width: 274px;
  margin-top: 10px;
  margin-bottom: 24px;
`;
const Text = styled.div`
height: 25px;
  color: #000;
  font-family: Pretendard;
  font-size: ${({ $s }) => $s};
  font-style: normal;
  font-weight: 500;
  line-height: 17.332px; /* 66.661% */
      background-image: linear-gradient(
    transparent 20%, 
    #2F6EEE26 90%   
  );
`;
