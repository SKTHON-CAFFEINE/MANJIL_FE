import { useOutletContext } from "react-router";
import styled from "styled-components";
import HelloSection from "./HelloSection";
import CheckConditionSection from "./CheckConditionSection";
import WhereMeSection from "./WhereMeSection";

export default function HomePage() {
  const { onModalChange } = useOutletContext();

  return (
    <HomePageWrapper>
      <HelloSection />
      <CheckConditionSection onModalChange={onModalChange} />
      <WhereMeSection />
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;