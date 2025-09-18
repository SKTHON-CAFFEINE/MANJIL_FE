import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./shared/layouts/RootLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ServiceLayout from "./shared/layouts/ServiceLayout";
import ProtectedRoute from "./shared/layouts/ProtectedRoute";

import RootPage from "./routes/home/index";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { index: true, Component: RootPage },
      
      {
        Component: ServiceLayout,
        children: [
          // 내 생각에 서비스 레이아웃에는 회원가입 & 로그인 관련 페이지들만 넣으면 될 듯..?
          // { path: "", Component:  },
        ],
      },

      // 토큰이 필요한 페이지들
      {
        Component: ProtectedRoute,
        children: [
          // 홈 페이지
          {
            path: "/",
            children: [
              // 향후 추가될 페이지들
              // { path: "", Component: },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;