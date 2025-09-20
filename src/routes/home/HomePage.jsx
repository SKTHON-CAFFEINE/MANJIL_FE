import styled from "styled-components";
import HelloSection from "./HelloSection";
import CheckConditionSection from "./CheckConditionSection";
import WhereMeSection from "./WhereMeSection";

export default function HomePage() {
  return (
    <HomePageWrapper>
      <HelloSection />
      <CheckConditionSection />
      <WhereMeSection />
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
