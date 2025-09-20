import styled from "styled-components";
import Smile from "@icon/home/smile.svg";
import rankbar from "@icon/home/rankbar.svg";

export default function RankSection() {
  return (
    <RankSectionWrapper>
      <TextSection>
        <NormalText>60대 당뇨 질환 여성 중</NormalText>
        <HighlightText>운동습관 83/100점</HighlightText>
        <FraiseSection>
          <HighlightText>잘하고 있어요!</HighlightText>
          <SmileImg src={Smile} alt="웃는 얼굴" />
        </FraiseSection>
        <DateText>9월 21일 활동 기준</DateText>
      </TextSection>
      <ImageSection>
        <RankBarImg src={rankbar} alt="랭크바" />
      </ImageSection>
    </RankSectionWrapper>
  );
}

const RankSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.01);
  margin-right: 20px;
  justify-content: center;
  padding-bottom: 20px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-left: 22px;
`;

const NormalText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%; /* 25px */
`;

const HighlightText = styled.p`
  color: #1d4ed8;
  font-family: Pretendard;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%;
`;

const FraiseSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;
  margin-bottom: 12px;
`;

const SmileImg = styled.img`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
`;

const DateText = styled.p`
  color: #7b7b7b;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%; /* 18.9px */
`;

const ImageSection = styled.div`
display: flex;
justify-content: center;
`;

const RankBarImg = styled.img`

`;