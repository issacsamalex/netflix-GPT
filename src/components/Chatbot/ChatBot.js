// ChatBot.js
import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaTimes, FaRocketchat } from "react-icons/fa";
import "./ChatBot.css"; // Import the CSS
import openai from "../../utils/openai";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false); // For toggling the chat window
  const [messages, setMessages] = useState([]); // Stores user & bot messages
  const [input, setInput] = useState(""); // User input
  const chatBoxRef = useRef(null); // Auto-scroll feature

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen); // Toggle the chat window

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]); // Add user message to state
    setInput(""); // Clear the input field

    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
      });

      console.log(chatCompletion.choices);

      //   const response = await fetch(
      //     "https://api.openai.com/v1/chat/completions",
      //     {
      //       method: "POST",
      //       model: "gpt-3.5-turbo",
      //       messages: [{ role: "user", content: input }],
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      //       },
      //     }
      //   );

      //   const botMessage = {
      //     sender: "bot",
      //     text: response.data.choices[0].message.content,
      //   };
      //   setMessages((prevMessages) => [...prevMessages, botMessage]); // Add bot response
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className={`chat-container ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <button className="chat-toggle" onClick={toggleChat}>
          ChatBot <FaRocketchat className="chat-icon" />
        </button>
      )}
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <span>Movie Assistant</span>
            <FaTimes onClick={toggleChat} className="close-icon" />
          </div>
          <div className="chat-messages" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask for movie suggestions..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            <FaPaperPlane onClick={sendMessage} className="send-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
