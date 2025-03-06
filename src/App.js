import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileLayout from "components/MobileLayout";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import PaperPlaneAnimation from "components/emailDone";

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route
            path="/email-done"
            element={
              <PaperPlaneAnimation
                title="이메일 전송 완료"
                description="입력하신 이메일로 챗봇 링크를 전송했습니다."
              />
            }
          />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;
