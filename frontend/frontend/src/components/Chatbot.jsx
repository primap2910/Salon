import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I am your Salon Assistant. Ask me anything about hair and beauty services!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/chat", {
        message: input,
      });
      const aiMessage = { role: "ai", text: res.data.message };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "Something went wrong. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>

      {/* Chat Icon - Click થી open */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "#6f42c1",
          color: "white",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "22px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.3)"
        }}
      >
        💬
      </div>

      {/* Chatbot Box */}
      {isOpen && (
        <div style={{
          position: "fixed",
          top: "70px",
          right: "10px",
          width: "350px",
          height: "500px",
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0 5px 30px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          zIndex: 9999
        }}>

          {/* Header with X button */}
          <div style={{
            backgroundColor: "#6f42c1",
            color: "white",
            padding: "15px",
            borderRadius: "15px 15px 0 0",
            fontWeight: "bold",
            fontSize: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>💬 Salon Assistant</span>
            <span
              onClick={() => setIsOpen(false)}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold"
              }}
            >
              ✕
            </span>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "#6f42c1" : "#f0f0f0",
                color: msg.role === "user" ? "white" : "black",
                padding: "10px 15px",
                borderRadius: "15px",
                maxWidth: "80%",
                fontSize: "14px"
              }}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{
                alignSelf: "flex-start",
                backgroundColor: "#f0f0f0",
                padding: "10px 15px",
                borderRadius: "15px",
                fontSize: "14px"
              }}>
                ✍️ Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            padding: "10px",
            display: "flex",
            gap: "10px",
            borderTop: "1px solid #eee"
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "14px"
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#6f42c1",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                fontSize: "18px"
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;