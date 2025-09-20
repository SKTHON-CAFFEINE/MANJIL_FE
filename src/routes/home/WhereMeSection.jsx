import styled from "styled-components";
import RankSection from "./RankSection";

export default function WhereMeSection() {
  return (
    <WhereMeSectionWrapper>
      <TitleWrapper>
        <TitleText>나는 지금 어디?</TitleText>
      </TitleWrapper>
      <RankSection />
    </WhereMeSectionWrapper>
  );
}

const WhereMeSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 20px 20px;
  padding-bottom: 120px;
`;

const TitleWrapper = styled.div`
  margin-top: 15px;
`;

const TitleText = styled.p`
  color: #111827;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 135%;
`;
