import badge from "@icon/home/badge.svg";
import styled from "styled-components";

export default function HelloSection() {
  return (
    <HelloSectionWrapper>
      <TextWrapper>
        <HelloTextWrapper>
          <HelloText>반가워요, 향숙님</HelloText>
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
  border-radius: 0;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-left: 33px;
`;

const BadgeIcon = styled.img`
  width: 119px;
  height: 118px;
  flex-shrink: 0;
  aspect-ratio: 119/118;
`;
