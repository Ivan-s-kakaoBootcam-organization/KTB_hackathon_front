import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiX } from "react-icons/fi";
import sendIcon from "../assets/icons/Iconly/Send.svg";
import uploadIcon from "../assets/icons/Iconly/Folder.svg";
import emoji from "../assets/icons/Image-1.svg";

const ChatBubble = ({ sender, text, type, image, isHtml = false }) => {
  return (
    <div className={`flex w-full ${type === "sent" ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`p-4 max-w-[80%] rounded-2xl shadow-md flex-col w-fit ${
          type === "sent" ? "bg-blue-500 text-white rounded-tr-none" : "bg-gray-100 text-black rounded-tl-none"
        }`}
        style={{ wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "pre-wrap" }}
      >
        <div className="flex items-start gap-3">
          {type !== "sent" && <img src={emoji} alt="Avatar" className="w-8 h-8" />}
          <div className="flex flex-col">
            <p className="font-bold">{sender}</p>
            {isHtml ? (
              <div
                className="text-sm leading-relaxed"
                style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br>") }}
              />
            ) : (
              <p className="text-sm leading-relaxed" style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
                {text}
              </p>
            )}
            {image && <img src={image} alt="첨부 이미지" className="mt-2 w-full max-w-xs rounded-lg" />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const location = useLocation();
  const { email, schoolName, grade, classNumber, studentName } = location.state || {};

  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    setImage(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    
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
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const removeImage = () => setImage(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center overflow-hidden">
      <div className="relative w-full max-w-[390px] h-screen flex flex-col shadow-lg bg-sky-200">
        <div className="fixed top-0 w-full max-w-[390px] bg-sky-200 text-black py-4 px-5 flex items-start justify-start z-10">
          <div className="flex flex-col ml-4">
            <h1 className="text-lg font-bold">{schoolName || "이도 초등학교"}</h1>
            <span className="text-gray-700 text-sm">
              {grade || "1"}학년 {classNumber || "1"}반 <span className="font-bold">{studentName || "이홍민"} 학부모</span>
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pt-[90px] pb-[120px]">
          {messages.map((msg) => <ChatBubble key={msg.id} {...msg} />)}
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
            <textarea
              ref={textareaRef}
              rows="1"
              placeholder="메시지를 입력하세요..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none resize-none text-sm"
            />
            <button onClick={sendMessage} className="text-gray-600">
              <img src={sendIcon} alt="Send" className="w-6 h-6" />
            </button>
          </div>
          <button onClick={() => fileInputRef.current.click()} className="text-gray-600">
            <img src={uploadIcon} alt="Upload" className="w-6 h-6" />
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
