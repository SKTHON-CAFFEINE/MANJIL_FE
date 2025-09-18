import { useState, useEffect } from "react";
import StartPage from "./StartPage";
import HomePage from "./HomePage";

export default function RootPage() {
  const [hasToken, setHasToken] = useState(null); // 토큰 여부 판단 상태변수

  useEffect(() => {
    let token = localStorage.getItem("accessToken");

    // 개발 환경에서 토큰이 없으면 자동으로 개발용 토큰 설정
    // !token: 토큰이 없는 상태 & import.meta.env.DEV: 개발 환경 여부 -> npm run dev 실행 시 true, 프로덕션 빌드 시 false
    if (!token && import.meta.env.DEV) {
      localStorage.setItem("accessToken", "dev-token-manjil");
      token = "dev-token-manjil";

      // 로그인 api 나오면 로그인 페이지로 리다이렉트 or 모달 표시
    }

    setHasToken(!!token); // 토큰 존재 -> true, 미존재 -> false
  }, []);

  const handleTokenSet = () => { // StartPage에서 로그인 성공 시 호출(콜백 함수)
    setHasToken(true);
  };

  if (hasToken == null) {
    return <div>Loading...</div>;
  }

  return (
    hasToken ? <HomePage /> : <StartPage onTokenSet={handleTokenSet} />
  );
}