import styled from "styled-components";
import badge from "../../shared/assets/icon/home/badge.svg";
import right_button from "../../shared/assets/icon/right_button.svg";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();

  const otherPage = (o) => {
    switch (o) {
      case 1:
        navigate("/");
        break;
      case 2:
        localStorage.removeItem("accessToken");
        navigate("/");
        break;
      case 3:
        localStorage.removeItem("accessToken");
        navigate("/");
        break;
    }
  };
  return (
    <Page>
      <img src={badge} style={{ width: "149px", height: "149px" }} />
      <Name>김향숙</Name>
      <NickName>프로운동러</NickName>
      <PointGroup>
        <PointBox>
          <PointText>나의 포인트</PointText>
          <Point>3280 P</Point>
        </PointBox>
        <PointBox>
          <PointText>포인트 SHOP</PointText>
          <Point>💰 바로가기</Point>
        </PointBox>
      </PointGroup>
      <SettingBox>
        <SettingText>계정설정</SettingText>
        <Bar />
        <TypeBox>
          <p>정보변경</p>
          <img src={right_button} onClick={() => otherPage(1)} />
        </TypeBox>
        <TypeBox>
          <p>로그아웃</p>
          <img src={right_button} onClick={() => otherPage(2)} />
        </TypeBox>
        <TypeBox>
          <p>회원탈퇴</p>
          <img src={right_button} onClick={() => otherPage(3)} />
        </TypeBox>
      </SettingBox>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  padding-top: 22px;
`;
const Name = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 30px */
  letter-spacing: -0.6px;
  margin-top: 10px;
  margin-bottom: 12px;
`;
const NickName = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
  letter-spacing: -0.4px;
`;
const PointGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 27px;
  margin-top: 27px;
  margin-bottom: 29px;
`;
const PointBox = styled.div`
  width: 151.537px;
  height: 71px;
  flex-shrink: 0;
  border-radius: 14.836px;
  background: #ededed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
const PointText = styled.div`
  color: var(--Gray-700, #5f6167);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 15.896px; /* 88.308% */
`;
const Point = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 16.955px;
  font-style: normal;
  font-weight: 700;
  line-height: 21.194px; /* 125% */
`;
const SettingBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SettingText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Bar = styled.div`
  width: 334px;
  height: 1px;
  background: #dadee9;
`;
const TypeBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 330px;

  color: #202122;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
