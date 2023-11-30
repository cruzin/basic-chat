//functional react component
"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useGuestUser } from "@/components/context/GuestUserContext";
import styles from "./gotochat.module.css";

const GoToChat = () => {
  const router = useRouter();
  const setGuestUser = useGuestUser().setUsername;
  const nameInputRef = useRef<HTMLInputElement>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);

  return <>
    <p> Please enter your desired username</p>
    <form onSubmit={(e) => {
      e.preventDefault();
      if (!nameInputRef?.current?.value) {
        setShowError(true);
      } else {
        setGuestUser(nameInputRef?.current?.value);
        router.push("/chat/1");
      }

    }} style={{ flex: 1, flexDirection: "column" }}>
      <input className={styles.input} ref={nameInputRef} placeholder={"Guest username"} /><br />
      <button>Click to enter the chatroom</button>
      {showError && <p style={{ color: "red" }}>Please chose a username</p>}
    </form>
  </>;
};

export default GoToChat;
