import { useState, useRef, useEffect } from "react";

const Message = ({ sender, text, isAI }) => {
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} my-2`}>
      <div
        className={`px-4 py-3 rounded-2xl max-w-[70%] ${
          isAI ? "bg-orange-300 text-black" : "bg-gray-300 text-black"
        }`}
      >
        <strong>{sender}:</strong> {text}
      </div>
    </div>
  );
};

const InputBox = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // if (e.shiftKey) {
      //   e.preventDefault();
      //   setInput((prev) => prev + "\n");
      // } else {
        e.preventDefault();
        handleSend();
      // }
    }
  };

  return (
    <div className="flex items-center p-3 bg-white border-t border-gray-300">
      <textarea
        className="flex-1 p-2 text-lg border border-gray-300 rounded-lg resize-none outline-none min-h-[40px] max-h-[120px] overflow-y-auto"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="AI 문의 선생님에게 의견을 들려주세요"
      />
      <button
        onClick={handleSend}
        disabled={!input.trim()}
        className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        📤
      </button>
      <button className="ml-2 text-gray-500">📎</button>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "안녕하세요! 주맹치 학부모님 🙂\n무슨 일로 문의 주시나요?",
      isAI: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async (input) => {
    if (!input.trim()) return;

    const userMessage = { sender: "부모님", text: input, isAI: false };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      if (data.aiResponse) {
        const aiMessage = { sender: "AI", text: data.aiResponse, isAI: true };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("AI 응답 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-[390px] h-[844px] flex flex-col border mx-auto bg-orange-100">
      <div className="flex items-center justify-between p-4 bg-orange-300 text-black font-semibold">
        <button>⬅</button>
        <h2>이도초등학교</h2>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} isAI={msg.isAI} />
        ))}
        {loading && <p>AI가 답변을 생성 중...</p>}
        <div ref={messagesEndRef} />
      </div>

      <InputBox onSend={handleSendMessage} />
    </div>
  );
};

export default Chat;
