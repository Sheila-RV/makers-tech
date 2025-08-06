// import React, { useState } from 'react';
// import axios from 'axios';

// const ChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { sender: "user", text: input }];
//     setMessages(newMessages);
//     setInput("");

//     try {
//       const res = await axios.post('http://localhost:5000/chat', { message: input });
//       setMessages([...newMessages, { sender: "bot", text: res.data.response }]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4 mt-8 bg-white rounded shadow">
//       <h1 className="text-xl font-bold mb-4">🤖 Makers Tech ChatBot</h1>
//       <div className="h-64 overflow-y-auto border p-2 mb-4">
//         {messages.map((msg, i) => (
//           <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
//             <span className={`inline-block px-3 py-2 rounded ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="border flex-1 px-3 py-2 rounded"
//           placeholder="Pregunta algo sobre nuestros productos"
//         />
//         <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post('http://localhost:5000/chat', { message: input });
      setMessages([...newMessages, { sender: "bot", text: res.data.response }]);
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-scroll al fondo
  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl border border-gray-100">
        <div className="flex items-center mb-4">
          <img
            src="maya-logo.png" // Ícono del bot 
            alt="Maya Bot"
            className="w-10 h-10 mr-2"
          />
          <h1 className="text-xl font-bold text-indigo-700">Maya Bot</h1>
        </div>

        <div ref={chatContainerRef} className="h-80 overflow-y-auto bg-gray-50 p-3 rounded-lg mb-4 space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl shadow text-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Pregúntame algo..."
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
