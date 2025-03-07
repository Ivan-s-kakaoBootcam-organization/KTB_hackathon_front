import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiX } from "react-icons/fi";
import sendIcon from "../assets/icons/Iconly/Send.svg";
import uploadIcon from "../assets/icons/Iconly/Folder.svg";
import sadEmoji from "../assets/icons/Image-1.svg";
import happyEmoji from "../assets/icons/Image-2.svg";
// import noEmoji from "../assets/icons/Image-3.svg";
import hereEmoji from "../assets/icons/Image.svg";
import LoadingBubble from "../components/LoadingBubble";
import PaperPlaneAnimation from "../components/emailDone";
import { motion } from "framer-motion";

// 말풍선 컴포넌트
const ChatBubble = ({ sender, text, type, image, isHtml }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className={`flex w-full ${type === "sent" ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`p-4 max-w-[80%] rounded-2xl shadow-md flex-col w-fit ${
          type === "sent"
            ? "bg-blue-500 text-white rounded-tr-none"
            : "item-start bg-gray-100 text-black rounded-tl-none"
        }`}
        style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
      >
        <div className="flex items-start gap-3">
          {type !== "sent" && (
            <img src={happyEmoji} alt="Avatar" className="w-8 h-8" />
          )}
          <div className="flex flex-col">
            {type !== "sent" && <p className="font-bold">{sender}</p>}
            {isHtml ? (
              <p
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ) : (
              <p className="text-sm leading-relaxed">{text}</p>
            )}
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
    </motion.div>
  );
};

// 종료 시 호출되는 메시지 컴포넌트
const LastMessage = ({ onGoodClick, onBadClick, isLoading, setLoading }) => {
  return (
    <div className="flex items-start gap-3 bg-gray-100 rounded-2xl p-4 w-fit max-w-[80%] shadow mb-4">
      {/* 이모지 */}
      <img src={hereEmoji} alt="Emoji" className="w-8 h-8" />

      {/* 메시지 컨텐츠 */}
      <div className="flex flex-col">
        <p className="font-bold text-black text-sm">
          답변하신 내용은 만족스러우신가요?
        </p>
        {/* 버튼 그룹 */}
        <div className="flex gap-3 mt-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded-full text-xs font-semibold shadow-sm"
            onClick={() => {
              onGoodClick();
            }}
            disabled={isLoading}
          >
            해결됐어요!
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-full text-xs font-semibold shadow-sm"
            onClick={() => {
              onBadClick();
            }}
            disabled={isLoading}
          >
            대화가 필요해요
          </button>
        </div>
      </div>
    </div>
  );
};

// 요청 시 호출되는 메시지 컴포넌트
const RequestMessage = ({ setRequestType, isLoading }) => {
  return (
    <div className="flex items-start gap-3 bg-gray-100 rounded-2xl p-4 w-fit max-w-[80%] shadow mb-4">
      {/* 이모지 */}
      <img src={sadEmoji} alt="Emoji" className="w-8 h-8" />

      {/* 메시지 컨텐츠 */}
      <div className="flex flex-col">
        <p className="font-bold text-black">안내드립니다.</p>
        <p className="text-gray-600 text-sm">
          선생님께 연락 드릴게요!
          <br />
          어떤 방법으로 연락 드릴까요?
        </p>

        {/* 버튼 그룹 */}
        <div className="flex gap-3 mt-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded-full text-xs font-semibold shadow-sm"
            onClick={() => {
              setRequestType("전화");
            }}
            disabled={isLoading}
          >
            전화
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-full text-xs font-semibold shadow-sm"
            onClick={() => {
              setRequestType("문자");
            }}
            disabled={isLoading}
          >
            개인면담
          </button>
        </div>
      </div>
    </div>
  );
};

// 채팅 페이지 컴포넌트
const ChatPage = () => {
  const location = useLocation();
  const { email, schoolName, grade, classNumber, studentName } =
    location.state || {};

  const [input, setInput] = useState("");
  const [image, setImage] = useState(null); // 이미지 상태 추가
  const [requestType, setRequestType] = useState(""); // 학부모 요청 타입
  const [endOfChat, setEndOfChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
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

  // requestType 상태가 변경될 때 특정 행동을 트리거
  useEffect(() => {
    if (requestType) {
      processChat();
    }
  }, [requestType]);

  // endOfChat 상태가 true로 변경될 때 특정 행동을 트리거
  useEffect(() => {
    if (endOfChat) {
      // 채팅 종료 메시지를 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: "시스템",
          text: "채팅이 종료되었습니다.",
          type: "system",
        },
      ]);
    }
  }, [endOfChat]);

  // 메시지 전송 함수
  const sendMessage = async () => {
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

    setLoading(true);

    // 특정 키워드 입력 시 `LastMessage` 트리거
    if (input.includes("/종료")) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            sender: "민지 선생님",
            text: "답변하신 내용은 만족스러우신가요?",
            type: "last",
          },
        ]);
        setLoading(false);
      }, 1000);
    } else {
      try {
        const response = await fetch("http://54.180.120.69:3001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: input,
            studentInfo: { grade, class: classNumber, name: studentName },
          }),
        });

        if (!response.ok) throw new Error("서버 응답 오류");

        const data = await response.json();

        let combinedResponse = data.response.replace(/\n/g, "<br>");

        if (data.relevantLinks && data.relevantLinks.length > 0) {
          combinedResponse += "<br><br>📌 관련 링크:";
          data.relevantLinks.forEach((link) => {
            combinedResponse += `<br>🔗 <a href='${link.url}' target='_blank' rel='noopener noreferrer' class='text-blue-500 underline break-all'>${link.title}</a>`;
          });
        }

        const botMessage = {
          id: messages.length + 2,
          sender: "민지 선생님",
          text: combinedResponse,
          type: "received",
          isHtml: true,
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("메시지 전송 오류:", error);
      } finally {
        setLoading(false);
      }
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

  const handleTextareaClick = () => {
    if (endOfChat) {
      window.location.reload();
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
    const chatHistory = messages.map((msg) => ({
      sender: msg.sender,
      text: msg.text,
    }));
    console.log(JSON.stringify(chatHistory, null, 2));
    return chatHistory;
  };

  const processChat = async () => {
    const convo = saveMessagesToVariable();
    setLoading(true);
    setShowAnimation(true);

    // 대화 내용 요약 API 호출
    const summarizedResponse = await fetch(
      "http://54.180.120.69:3001/api/summarize-conversation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: convo,
          studentInfo: { grade, class: classNumber, name: studentName },
        }),
      }
    );

    if (!summarizedResponse.ok) throw new Error("서버 응답 오류");

    const summarizedData = await summarizedResponse.json();

    console.log(summarizedData);

    // 대화 내용 분류 API 호출
    const classifiedResponse = await fetch(
      "http://54.180.120.69:3001/api/classify-conversation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: convo,
          studentInfo: { grade, class: classNumber, name: studentName },
        }),
      }
    );

    if (!classifiedResponse.ok) throw new Error("서버 응답 오류");

    const classifiedData = await classifiedResponse.json();

    console.log(classifiedData);

    // 이메일 전송 API 호출
    const formData = new FormData();
    formData.append(
      "studentInfo",
      JSON.stringify({ grade, class: classNumber, name: studentName })
    );
    formData.append("conversation", JSON.stringify(convo));
    formData.append("status", classifiedData.status);
    formData.append("requestType", requestType);
    formData.append(
      "summary",
      JSON.stringify({
        topic: summarizedData.summary.topic,
        keyPoints: summarizedData.summary.keyPoints,
      })
    );
    formData.append("teacherEmail", email);
    formData.append("image", image);

    const emailResponse = await fetch(
      "http://54.180.120.69:3001/api/send-email",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!emailResponse.ok) throw new Error("서버 응답 오류");

    const emailData = await emailResponse.json();

    console.log(emailData);

    setLoading(false);
    setTimeout(() => {
      setShowAnimation(false);
      setEndOfChat(true);
    }, 1000);
    return;
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center overflow-hidden">
      {showAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PaperPlaneAnimation />
        </div>
      )}
      {/* 채팅 컨테이너 */}
      <div className="relative w-full max-w-[390px] h-screen flex flex-col shadow-lg bg-sky-200">
        {/* 헤더 */}
        <div className="fixed top-0 w-full max-w-[390px] bg-sky-200 text-black py-4 px-5 flex items-start justify-start z-10">
          <div className="flex flex-col ml-4">
            <h1 className="text-lg font-bold text-black-800">
              {schoolName || "이도 초등학교"}
            </h1>
            <span className="text-gray-700 text-sm">
              {grade || "1"}학년 {classNumber || "1"}반{" "}
              <span className="font-bold">
                {studentName || "이홍민"} 학부모
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
                onGoodClick={() => processChat()}
                onBadClick={() => showRequestMessage()}
                isLoading={loading}
                setLoading={setLoading}
              />
            ) : msg.type === "request" ? (
              <RequestMessage
                key={msg.id}
                setRequestType={setRequestType}
                isLoading={loading}
                setLoading={setLoading}
              />
            ) : (
              <ChatBubble
                key={msg.id}
                sender={msg.sender}
                text={msg.text}
                type={msg.type}
                image={msg.image}
                isHtml={msg.isHtml}
              />
            )
          )}
          {loading && (
            <div className="flex justify-center items-center">
              <LoadingBubble />
            </div>
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
              placeholder={
                endOfChat
                  ? "채팅이 종료되었습니다."
                  : "민지 선생님에게 의견을 들려주세요"
              }
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none resize-none text-sm"
              onClick={handleTextareaClick}
            />

            {/* 전송 버튼 (SVG 이미지) */}
            <button onClick={() => sendMessage()} className="text-gray-600">
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
