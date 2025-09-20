import { useState } from "react";
import { useLocation } from "react-router";
import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../commons/navbar";
// import Header from "../commons/Header";

export default function RootLayout() {
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasToken = !!localStorage.getItem("accessToken");

  const hideNav = !hasToken && pathname === "/";

  return (
    <main>
      {/* <Header /> */}
      <Outlet context={{ onModalChange: setIsModalOpen }} />
      <ScrollRestoration />
      {!isModalOpen && !hideNav && <Navbar />}
    </main>
  );
}
