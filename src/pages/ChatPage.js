import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiX } from "react-icons/fi";
import sendIcon from "../assets/icons/Iconly/Send.svg";
import uploadIcon from "../assets/icons/Iconly/Folder.svg";
import emoji from "../assets/icons/Image-1.svg";

const ChatBubble = ({ sender, text, type, image }) => {
  return (
    <div
      className={`flex w-full ${type === "sent" ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`p-4 max-w-[80%] rounded-2xl shadow-md flex-col w-fit ${
          type === "sent"
            ? "bg-blue-500 text-white rounded-tr-none"
            : "item-start bg-gray-100 text-black rounded-tl-none"
        }`}
      >
        <div className="flex items-start gap-3">
          {type !== "sent" && (
            <img src={emoji} alt="Avatar" className="w-8 h-8" />
          )}
          <div className="flex flex-col">
            {type !== "sent" && <p className="font-bold">{sender}</p>}
            <p className="text-sm leading-relaxed">{text}</p>
            {image && (
              <img
                src={image}
                alt="첨부 이미지"
                className="mt-2 w-full max-w-xs rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LastMessage = ({ onGoodClick, onBadClick }) => {
  return (
    <div className="flex items-start gap-3 bg-gray-100 rounded-2xl p-4 w-fit max-w-[80%] shadow mb-4">
      {/* 이모지 */}
      <img src={emoji} alt="Emoji" className="w-8 h-8" />

      {/* 메시지 컨텐츠 */}
      <div className="flex flex-col">
        <p className="font-bold text-black text-sm">
          답변하신 내용은 만족스러우신가요?
        </p>
        {/* 버튼 그룹 */}
        <div className="flex gap-3 mt-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded-full text-xs font-semibold shadow-sm"
            onClick={onGoodClick}
          >
            해결됐어요!
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-full text-xs font-semibold shadow-sm"
            onClick={onBadClick}
          >
            대화가 필요해요
          </button>
        </div>
      </div>
    </div>
  );
};

const RequestMessage = () => {
  return (
    <div className="flex items-start gap-3 bg-gray-100 rounded-2xl p-4 w-fit max-w-[80%] shadow mb-4">
      {/* 이모지 */}
      <img src={emoji} alt="Emoji" className="w-8 h-8" />

      {/* 메시지 컨텐츠 */}
      <div className="flex flex-col">
        <p className="font-bold text-black">안내 드립니다.</p>
        <p className="text-gray-600 text-sm">
          선생님께 연락을 드리겠다.
          <br />
          어떻게 하실런지
        </p>

        {/* 버튼 그룹 */}
        <div className="flex gap-3 mt-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded-full text-xs font-semibold shadow-sm"
            onClick={() => alert("전화 연결")}
          >
            전화
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-full text-xs font-semibold shadow-sm"
            onClick={() => alert("문자 보내기")}
          >
            개인면담
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const location = useLocation();
  const { email, schoolName, grade, classNumber, studentName } =
    location.state || {};

  const [input, setInput] = useState("");
  const [image, setImage] = useState(null); // 이미지 상태 추가
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "민지 선생님",
      text: `${studentName} 학부모님 무슨 일로 문의 주셨나요?`,
      type: "received",
    },
  ]);

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
      sender: "나",
      text: input,
      image: image,
      type: "sent",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setImage(null); // 이미지 초기화

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // 특정 키워드 입력 시 `LastMessage` 트리거
    if (input.includes("/종료")) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: "답변하신 내용은 만족스러우신가요?",
            type: "last",
          },
        ]);
      }, 1000);
    } else {
      // 챗봇 응답 추가 (1초 후)
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        const botMessage = {
          id: messages.length + 2,
          sender: "민지 선생님",
          text: botResponse,
          type: "received",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
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

  const showRequestMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        text: "답변된 내용이 만족스럽지 않아 선생님께 연락드립니다.",
        type: "request",
      },
    ]);
  };

  // 대화 내용을 변수에 저장하는 함수
  const saveMessagesToVariable = () => {
    const chatHistory = messages;
    return JSON.stringify(chatHistory, null, 2);
    // alert(JSON.stringify(chatHistory, null, 2)); // 대화 내용을 alert로 표시
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center overflow-hidden">
      {/* 채팅 컨테이너 */}
      <div className="relative w-full max-w-[390px] h-screen flex flex-col shadow-lg bg-sky-200">
        {/* 헤더 */}
        <div className="fixed top-0 w-full max-w-[390px] bg-sky-200 text-black py-4 px-5 flex items-start justify-start z-10">
          <div className="flex flex-col ml-4">
            <h1 className="text-lg font-bold text-black-800">
              {schoolName ? schoolName : "이도 초등학교"}
            </h1>
            <span className="text-gray-700 text-sm">
              {grade ? grade : "1"}학년 {classNumber ? classNumber : "1"}반{" "}
              <span className="font-bold">
                {studentName ? studentName : "이홍민"} 학부모
              </span>
            </span>
          </div>
        </div>
        {/* 채팅창 */}
        <div className="flex-1 overflow-y-auto px-4 pt-[90px] pb-[120px]">
          {messages.map((msg) =>
            msg.type === "last" ? (
              <LastMessage
                key={msg.id}
                onGoodClick={() => alert("종료합니다")}
                onBadClick={() => showRequestMessage()}
              />
            ) : msg.type === "request" ? (
              <RequestMessage key={msg.id} />
            ) : (
              <ChatBubble
                key={msg.id}
                sender={msg.sender}
                text={msg.text}
                type={msg.type}
                image={msg.image}
              />
            )
          )}
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
        <div className="fixed bottom-0 w-full max-w-[390px] bg-white px-4 py-3 border-t z-10 flex items-center gap-3">
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-3 w-full">
            {/* 입력창 */}
            <textarea
              ref={textareaRef}
              rows="1"
              placeholder="민지 선생님에게 의견을 들려주세요"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none resize-none text-sm"
            />

            {/* 전송 버튼 (SVG 이미지) */}
            <button
              onClick={() => alert("메시지 전송")}
              className="text-gray-600"
            >
              <img src={sendIcon} alt="Send" className="w-6 h-6" />
            </button>
          </div>

          {/* 파일 업로드 버튼 */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-gray-600"
          >
            <img src={uploadIcon} alt="Upload" className="w-6 h-6" />
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
