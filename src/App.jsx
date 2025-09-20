import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "./shared/layouts/RootLayout";
import ServiceLayout from "./shared/layouts/ServiceLayout";
import ProtectedRoute from "./shared/layouts/ProtectedRoute";

import RootPage from "./routes/home/index";
import LoginPage from "./routes/login/LoginPage";
// import LoginPage from "./routes/auth/LoginPage";
// import SignupPage from "./routes/auth/SignupPage";

const router = createBrowserRouter([
  // 일반 서비스 브랜치 (RootLayout 사용)
  {
    Component: RootLayout,
    children: [
      { index: true, Component: RootPage },
      {
        Component: ProtectedRoute,
        children: [
          // 보호가 필요한 페이지들
          // { path: "", Component:  },
        ],
      },
      // 기타 공개 페이지들
    ],
  },

  // 인증/회원가입 브랜치 (ServiceLayout 사용, RootLayout 미사용)
  {
    path: "/auth",
    Component: ServiceLayout,
    children: [
      { index: true, Component: LoginPage },
      // { path: "", Component: LoginPage },
      // { path: "", Component: SignupPage },
    ],
  },

]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 1 },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
