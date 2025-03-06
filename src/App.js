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
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;
