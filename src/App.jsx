import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "./shared/layouts/RootLayout";
import ServiceLayout from "./shared/layouts/ServiceLayout";
import ProtectedRoute from "./shared/layouts/ProtectedRoute";

import RootPage from "./routes/home/index";
import LoginPage from "./routes/login/LoginPage";
import Level1 from "./routes/signUp/level1";
import Level2 from "./routes/signUp/level2";
import Level3 from "./routes/signUp/level3";
import Level4 from "./routes/signUp/level4";
// import LoginPage from "./routes/auth/LoginPage";
// import SignupPage from "./routes/auth/SignupPage";

import VerifySquat from "./routes/verify/VerifySquat";
import ExerciseRecommendationPage from "./routes/home/ExerciseRecommendationPage";

import Calender from "./routes/calender/index";

import My from "./routes/my/index";

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
          { path: "/verify", Component: VerifySquat },
          { path: "/exercise-recommendation", Component: ExerciseRecommendationPage },

          // 캘린더 페이지
          {
            path: "/calender",
            children: [
              { index: true, Component: Calender },
              // { path: "", Component:  },
            ],
          },

          // 마이페이지
          {
            path: "/my",
            children: [
              { index: true, Component: My },
              // { path: "", Component:  },
            ],
          },
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
      { path: "signUp/level1", Component: Level1 },
      { path: "signUp/level2", Component: Level2 },
      { path: "signUp/level3", Component: Level3 },
      { path: "signUp/level4", Component: Level4 },
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
