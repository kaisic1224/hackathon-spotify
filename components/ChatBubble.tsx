import React from "react";
import { ChatMessage } from "./ChatWindow";

const ChatBubble = ({ chat }: { chat: ChatMessage }) => {
  return (
    <>
      {chat?.sender ? (
        <div className="block p-4">
          <div className="flex ml-2">
            <h1 className="pr-4">{chat?.username}</h1>
            <h2>{chat?.time}</h2>
          </div>
          <div className="max-w-4xl w-fit p-2 px-4 bg-blue-100 rounded-2xl">
            <span>{chat?.message}</span>
          </div>
        </div>
      ) : (
        <div className="block p-4">
          <div className="flex ml-2">
            <h1 className="pr-4">{chat?.username}</h1>
            <h2>{chat?.time}</h2>
          </div>
          <div className="max-w-4xl w-fit p-2 px-4 bg-red-100 rounded-2xl">
            <span>{chat?.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBubble;
