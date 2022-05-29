import { useSession } from "next-auth/react";
import { useState, Dispatch, SetStateAction, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { ChatMessage } from "./ChatWindow";

const SendMessage = ({
  messages,
  setMessages,
}: {
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<Array<ChatMessage>>>;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [msg, setMsg] = useState("");
  const newary = messages;
  const { data: session } = useSession();
  return (
    <form
      className="relative mt-4"
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        const chat = {
          time: new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          sender: true,
          username: session?.user?.name ?? "User",
          message: msg,
        };
        setMessages([...messages, chat]);
        setMsg("");
      }}
    >
      <textarea
        name="type-here"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            formRef?.current?.dispatchEvent(new Event("submit"));
          }
        }}
        minLength={10}
        required
        placeholder="Ask a question..."
        className="resize-none pb-2 pt-6 leading-5 outline-none w-full rounded-xl pr-8 text-xl pl-4 max-h-max bg-blue-100 hover:bg-blue-200 focus:bg-blue-200 p-2"
      />
      <label
        htmlFor="send-btn"
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <FaPaperPlane />
      </label>
      <input className="hidden" type="submit" value="submit" id="send-btn" />
    </form>
  );
};
export default SendMessage;
