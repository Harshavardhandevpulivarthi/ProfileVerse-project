import React, { useState } from "react";
import axios from "axios";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Function to send user message to backend and get AI response
  const getAIResponse = async (userMessage) => {
    if (!userMessage.trim()) return; // Prevent empty messages

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5003/chat", // Ensure this matches your backend URL
        { message: userMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.response || "No response from AI";
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userMessage },
        { sender: "bot", text: botMessage },
      ]);
    } catch (error) {
      console.error("❌ Error fetching AI response:", error);

      let errorMessage = "Oops! Something went wrong. Try again later.";

      if (error.response) {
        console.log("🔍 Response Error Data:", error.response.data);
        errorMessage = error.response.data.error || "Server error occurred.";
      } else if (error.request) {
        console.log("🔍 No Response Received:", error.request);
        errorMessage = "No response from server. Please check your connection.";
      } else {
        console.log("🔍 Request Error:", error.message);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: errorMessage },
      ]);
    }

    setLoading(false);
  };

  // ✅ Function to handle sending message
  const handleSendMessage = () => {
    if (input.trim() === "") return;
    getAIResponse(input);
    setInput(""); // Clear input field
  };

  // ✅ Function to handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-gray-800 text-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-bold">Chat with AI</h2>
      <div className="h-40 overflow-y-auto bg-gray-700 p-2 rounded">
        {messages.map((msg, index) => (
          <p key={index} className={`p-2 rounded ${msg.sender === "user" ? "text-right text-blue-300" : "text-left text-green-300"}`}>
            {msg.text}
          </p>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // Send on "Enter"
          className="flex-grow p-2 rounded bg-gray-600 text-white"
          placeholder="Type a message..."
        />
        <button 
          onClick={handleSendMessage} 
          className="ml-2 px-3 py-1 bg-green-500 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
