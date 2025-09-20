import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../commons/navbar";
// import Header from "../commons/Header";

export default function RootLayout() {
  return (
    <main>
      {/* <Header /> */}
      <Outlet />
      <ScrollRestoration />
      <Navbar />
    </main>
  );
}