import React, { useState } from "react";
import ChatBubble from "./ChatBubble";
import SendMessage from "./SendMessage";
import { useSession } from "next-auth/react";

export interface ChatMessage {
  time: string;
  sender: boolean;
  username: string;
  message: string;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { data: session } = useSession();
  return (
    <>
      <div className="max-w-6xl mx-auto bg-slate-200">
        <ul className="max-h-[700px] min-h-[700px] overflow-y-auto">
          {messages.length != 0 &&
            messages.map((msg) => {
              return (
                <li>
                  <ChatBubble chat={msg} />
                </li>
              );
            })}
        </ul>
      </div>
      <div className="max-w-6xl mx-auto">
        <SendMessage messages={messages} setMessages={setMessages} />
      </div>
    </>
  );
};

export default ChatWindow;
