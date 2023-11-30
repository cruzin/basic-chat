import { useGuestUser } from "@/components/context/GuestUserContext";
import { ChangeEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import useChat from "@/components/hooks/useChat";
import { useRouter } from "next/navigation";
import { MsgType } from "@/components/hooks/useChat";
import styles from "./chat.module.css";
import classNames from "classnames";


const Chat = ({ chatId, preExistingMessages }: { chatId?: string, preExistingMessages: MsgType[] }) => {
  const router = useRouter();
  const { webSocket, messageHistory, setMessageHistory } = useChat(preExistingMessages);
  const guestUser = useGuestUser().username;

  if (!guestUser) {
    router.push("/");
    return null;
  }

  const handleMessageSubmit = (message: string) => {
    const newMessage = { user: guestUser, message: message, timeStamp: new Date().getTime() };
    setMessageHistory([...messageHistory, newMessage]);

    webSocket?.current?.emit("input-change", newMessage);
  };


  return (

    <div className={styles.chatPageWrapper}>
      <h1 className={styles.chatHeader}>{"Hello " + guestUser + " welcome to the chatroom"}</h1>
      <div className={styles.chatWrapper}>
        <div className={styles.chatHistory}>
          {messageHistory.map((message, i) => {
            const isYou = message.user === guestUser;
            const msgDate = new Date(message.timeStamp);
            return (
              <div key={i} className={classNames(styles.message, isYou && styles.self)}>
                <span
                  className={classNames(styles.userName, isYou && styles.self)}>{isYou ? "You" : message.user}</span>
                <div
                  className={classNames(styles.text, isYou && styles.self)}>{message.message}</div>
                <span
                  className={styles.date}>{msgDate.getDate() + " " + msgDate.toLocaleString("default", { month: "short" }) + " " + msgDate.getFullYear() + " " + msgDate.getHours() + ":" + msgDate.getMinutes()}</span>
              </div>
            );
          })}
          <AlwaysScrollToBottom />
        </div>
        {webSocket !== null &&
          <ChatInput handleMessageSubmit={handleMessageSubmit} />}
      </div>
    </div>

  );
};

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return elementRef?.current?.scrollIntoView();
  });
  return <div ref={elementRef} />;
};

const ChatInput = ({ handleMessageSubmit }: {
  handleMessageSubmit: (message: string) => void,
}) => {

  const [input, setInput] = useState("");
  const handleSend = () => {
    if (input !== "") {
      handleMessageSubmit(input);
      setInput("");
    }
  };

  return  <div className={styles.chatInputArea}>
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


export default Chat;