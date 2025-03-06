import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  FiPhoneCall,
  FiArrowLeft,
  FiCamera,
  FiSend,
  FiX,
} from "react-icons/fi";

const ChatPage = () => {
  const location = useLocation();
  const { email, schoolName, grade, classNumber, studentName } =
    location.state || {};

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null); // 이미지 상태 추가
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // 새 메시지가 추가되면 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 챗봇의 응답을 생성하는 함수
  const getBotResponse = (userInput) => {
    if (userInput.includes("공부")) return "네, 오늘도 열심히 공부했습니다!";
    if (userInput.includes("자고"))
      return "음... 수업 중에 졸았다면 선생님께서 따로 말씀해 주실 거예요.";
    if (userInput.includes("번호")) return "선생님 번호는 알려드릴 수 없어요!";
    return "죄송해요, 잘 이해하지 못했어요. 다시 한번 말씀해 주세요.";
  };

  // 메시지 전송 함수
  const sendMessage = () => {
    if (input.trim() === "" && !image) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "parent",
      text: input,
      avatar: "👤",
      image: image,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setImage(null); // 이미지 초기화

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // 챗봇 응답 추가 (1초 후)
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage = {
        id: messages.length + 2,
        sender: "bot",
        text: botResponse,
        avatar: "🤖",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  // 파일 선택 핸들러 (이미지 업로드)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // 이미지 삭제 핸들러
  const removeImage = () => {
    setImage(null);
  };

  // 입력 창 크기 조절 (자동 줄바꿈 및 높이 확장)
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Enter 입력 처리 (IME 상태 확인)
  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center overflow-hidden">
      {/* 채팅 컨테이너 */}
      <div className="relative w-full max-w-[390px] h-screen flex flex-col shadow-lg bg-sky-200">
        {/* 헤더 */}
        <div className="fixed top-0 w-full max-w-[390px] bg-transparent text-black py-4 px-5 flex items-start justify-start z-10">
          <div className="flex flex-col ml-4">
            <h1 className="text-lg font-bold text-black-800">
              {schoolName}이도 초등학교
            </h1>
            <span className="text-gray-700 text-sm">
              {grade}1학년 {classNumber}1반{studentName}{" "}
              <span className="font-bold">이홍민 학부모</span>
            </span>
          </div>
        </div>
        {/* 채팅창 */}
        <div className="flex-1 overflow-y-auto px-4 pt-[90px] pb-[120px]">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "parent" ? "justify-end" : "justify-start"} mb-2 ${
                index === 0 ? "mt-4" : ""
              }`}
            >
              {/* 아바타 */}
              {msg.sender !== "parent" && (
                <span className="text-2xl mr-2">{msg.avatar}</span>
              )}

              {/* 말풍선 */}
              <div
                className={`p-3 max-w-[70%] rounded-lg shadow-md ${msg.sender === "parent" ? "bg-blue-500 text-white" : "bg-white text-gray-700"} break-words`}
              >
                <p className="text-sm">{msg.text}</p>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Uploaded"
                    className="mt-2 w-40 rounded-lg"
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* 이미지 미리보기 */}
        {image && (
          <div className="fixed bottom-20 w-full max-w-[390px] px-4 flex justify-between items-center bg-white shadow-md rounded-lg p-2">
            <img src={image} alt="Preview" className="h-20 w-auto rounded-lg" />
            <button onClick={removeImage} className="text-red-500 text-xl">
              <FiX />
            </button>
          </div>
        )}
        {/* 입력창 */}
        <div className="fixed bottom-0 w-full max-w-[390px] bg-white px-4 py-3 border-t z-10">
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-3 w-full">
            {/* 입력창 */}
            <textarea
              ref={textareaRef}
              rows="1"
              placeholder="민지 선생님에게 의견을 들려주세요"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none resize-none"
            />

            {/* 전송 버튼 */}
            <button onClick={sendMessage} className="text-gray-600">
              <FiSend size={20} />
            </button>
          </div>

          {/* 파일 업로드 버튼 */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="ml-3 text-gray-600"
          >
            📁
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
