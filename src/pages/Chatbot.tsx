// import OpenAI from "openai";

// // const openai = new OpenAI({
// //     organization: "org-qnj3vIGLxfgp9eedgLBu4dpT",
// //     project: "$PROJECT_ID",
// // });

// function Chatbot() {
//   async function sendMessage() {
//     const userInput = document.getElementById("user-input").value;
//     if (!userInput) return;
//     addMessage("Người dùng", userInput);
//     document.getElementById("user-input").value = "";

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer `,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: userInput }],
//       }),
//     });

//     const data = await response.json();
//     const botMessage = data.choices[0].message.content;

//     addMessage("ChatGPT", botMessage);
//   }

//   function addMessage(sender, message) {
//     const messagesContainer = document.getElementById("chatbot-messages");
//     const messageElement = document.createElement("div");
//     messageElement.classList.add("message");

//     if (sender === "Người dùng") {
//       messageElement.classList.add("user-message");
//     } else {
//       messageElement.classList.add("bot-message");
//     }

//     messageElement.textContent = `${sender}: ${message}`;
//     messagesContainer.appendChild(messageElement);
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
//   }

//   return (
//     <>
//       <div className="chatbot-container">
//         <div className="chatbot-messages" id="chatbot-messages"></div>
//         <div className="chatbot-input">
//           <input type="text" id="user-input" placeholder="Nhập tin nhắn..." />
//           <button onClick={sendMessage}>Gửi</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Chatbot;

import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "";
// "Explain things like you would to a 10 year old learning how to code." proj_Rm0Mj70f8Kb0gSKuG9MknsPc
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content: "Explain things like you're talking to a 6 years old kid.",
};

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatbot;
