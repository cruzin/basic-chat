import { useState } from "react";
import styles from "@/components/Chat/chat.module.css";

export const ChatInput = ({ handleMessageSubmit }: {
  handleMessageSubmit: (message: string) => void,
}) => {

  const [input, setInput] = useState("");
  const handleSend = () => {
    if (input !== "") {
      handleMessageSubmit(input);
      setInput("");
    }
  };

  return <div className={styles.chatInputArea}>
    <textarea
      className={styles.chatInput}
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSend();
        }
      }}
    />
    <button className={styles.sendButton} onClick={handleSend}>Send</button>
  </div>;
};