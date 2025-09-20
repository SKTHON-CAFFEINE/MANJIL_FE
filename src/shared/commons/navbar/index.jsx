import styled from "styled-components";
import NavItem from "./NavItem";

import HomeIcon from "@icon/navbar/home.svg";
import HomeActive from "@icon/navbar/home_active.svg";
import CalenderIcon from "@icon/navbar/calender.svg";
import CalenderActive from "@icon/navbar/calender_active.svg";
import MyIcon from "@icon/navbar/my.svg";
import MyActive from "@icon/navbar/my_active.svg";

export default function NavBar() {
    return (
      <NavBarWrapper>
        <NavItem icon={HomeIcon} activeIcon={HomeActive} to="/" label={"홈"} />
        <NavItem icon={CalenderIcon} activeIcon={CalenderActive} to="/calender" label={"캘린더"} />
        <NavItem icon={MyIcon} activeIcon={MyActive} to="/my" label={"마이"}  />
      </NavBarWrapper>
    );
}

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 390px;
  height: 94px;
  background-color: #fff;
  display: flex;
  z-index: 1000;
`;