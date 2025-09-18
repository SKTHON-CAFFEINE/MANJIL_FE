import { Outlet, ScrollRestoration } from "react-router";

export default function ServiceLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}