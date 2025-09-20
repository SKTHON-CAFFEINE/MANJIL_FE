import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";

export default function NavItem({ icon, activeIcon, to, label }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <ItemWrapper onClick={() => navigate(to)}>
      <Icon src={isActive ? activeIcon : icon} alt={`${label} icon`} />
      <Label $isActive={isActive}>{label}</Label>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 3px;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

const Label = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "$isActive",
})`
  margin-top: 4px;
  color: ${({ $isActive }) => ($isActive ? "#427BF0" : "#959595")};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 125% */
  letter-spacing: -0.5px;
`;
