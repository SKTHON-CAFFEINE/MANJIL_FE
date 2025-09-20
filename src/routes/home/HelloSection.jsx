import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import badge from "@icon/home/badge.svg";
import styled from "styled-components";
import { UserAPI } from "../../shared/lib/api";

export default function HelloSection() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({
    username: "사용자",
    point: 0,
    recommendedToday: false
  });

  // 오늘 추천 받았는지 확인하는 함수
  const checkTodayRecommendation = () => {
    const today = new Date().toDateString(); // "Mon Jan 01 2024" 형식
    const lastRecommendationDate = localStorage.getItem('lastRecommendationDate');
    return lastRecommendationDate === today;
  };

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await UserAPI.getUserSummary();
      if (response.success) {
        // API 데이터를 사용하되, recommendedToday는 프론트엔드 제한으로 덮어쓰기
        setUserInfo({
          ...response.data,
          recommendedToday: checkTodayRecommendation() // 프론트엔드 제한 우선 적용
        });
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      // API 호출 실패 시 기본값 사용
      setUserInfo({
        username: "사용자",
        point: 0,
        recommendedToday: checkTodayRecommendation() // 프론트엔드에서 확인
      });
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 페이지가 변경될 때마다 사용자 정보 다시 가져오기
  useEffect(() => {
    fetchUserInfo();
  }, [location.pathname]);

  return (
    <HelloSectionWrapper>
      <TextWrapper>
        <HelloTextWrapper>
          <HelloText>반가워요, {userInfo.username}님</HelloText>
          <HelloText>힘차게 시작해요!</HelloText>
        </HelloTextWrapper>
        <AliasWrapper>
          <AliasText>프로운동러</AliasText>
        </AliasWrapper>
      </TextWrapper>
      <BadgeWrapper>
        <BadgeIcon src={badge} alt="배지" />
      </BadgeWrapper>
    </HelloSectionWrapper>
  );
}

const HelloSectionWrapper = styled.div`
  background-color: #4b86ff;
  padding: 20px 29px 35px 20px;
  display: flex;
  flex-direction: row;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HelloTextWrapper = styled.div`
  flex: 1;
`;

const HelloText = styled.p`
  color: #fff;
  font-family: Roboto;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%;
`;

const AliasWrapper = styled.div`
  margin-top: 8px;
`;

const AliasText = styled.div`
  color: #fff;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 29px;
`;

const BadgeWrapper = styled.div`
`;

const BadgeIcon = styled.img`
  width: 119px;
  height: 118px;
  flex-shrink: 0;
  aspect-ratio: 119/118;
`;
