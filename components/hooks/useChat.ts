import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export type MsgType = {
  user: string,
  message: string,
  timeStamp: number,
}

function useChat(preExistingMessages: MsgType[]) {
  const [messageHistory, setMessageHistory] = useState<MsgType[]>(preExistingMessages);
  const webSocket = useRef<null | Socket>(null);
  const secondRender = useRef(false);

  useEffect(() => {

    if (secondRender.current) { //If we don't do this, we get a double socket connection due to dev server shennanigangs
      return;
    }
    secondRender.current = true;

    const socketInitializer = async () => {
      await fetch("/api/socket");

      webSocket.current = io();

      webSocket.current.on("connect", () => {
        console.log("connected" + new Date().getTime());
      });

      webSocket.current.on("update-input", (msg: MsgType) => {
        setMessageHistory((messageHistory: MsgType[]) => {
          return [...messageHistory, msg];
        });
      });
    };

    socketInitializer();


    return () => { //when working with sockets, cleanup is important to avoid leaks
      webSocket?.current?.close();
    };
  }, []);

  return { messageHistory, setMessageHistory, webSocket };
}

export default useChat;