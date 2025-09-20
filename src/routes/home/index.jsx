import { useState, useEffect } from "react";
import StartPage from "./StartPage";
import HomePage from "./HomePage";

export default function RootPage() {
  const [hasToken, setHasToken] = useState(null); // 토큰 여부 판단 상태변수

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
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