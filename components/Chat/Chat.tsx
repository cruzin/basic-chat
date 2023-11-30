import { useGuestUser } from "@/components/context/GuestUserContext";
import { useEffect, useRef } from "react";
import useChat, { MsgType } from "@/components/hooks/useChat";
import { useRouter } from "next/navigation";
import styles from "./chat.module.css";
import classNames from "classnames";
import { ChatInput } from "@/components/Chat/ChatInput";


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
              <Message key={i} isYou={isYou} message={message} msgDate={msgDate} />
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

function Message({ isYou, message, msgDate }: { isYou: boolean, message: MsgType, msgDate: Date }) {
  return <div className={classNames(styles.message, isYou && styles.self)}>
    <span
      className={classNames(styles.userName, isYou && styles.self)}>{isYou ? "You" : message.user}</span>
    <div className={classNames(styles.text, isYou && styles.self)}>{message.message}</div>
    <span className={styles.date}>{msgDate.getDate() + " " +
      msgDate.toLocaleString("default", { month: "short" }) + " " + msgDate.getFullYear()
      + " " + msgDate.getHours() + ":" + msgDate.getMinutes()}</span>
  </div>;
}


export default Chat;