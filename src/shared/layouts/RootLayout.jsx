import { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../commons/navbar";
// import Header from "../commons/Header";

export default function RootLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      {/* <Header /> */}
      <Outlet context={{ onModalChange: setIsModalOpen }} />
      <ScrollRestoration />
      {!isModalOpen && <Navbar />}
    </main>
  );
}