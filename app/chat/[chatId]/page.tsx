"use client";

import Chat from "@/components/Chat/Chat";
import { useEffect, useRef, useState } from "react";
import { MsgType } from "@/components/hooks/useChat";



const ChatPage = ({ params:{ chatId} }: { params: { chatId: string }}) => {

  const [messageHistory, setMessageHistory] = useState<MsgType[]>([]);
  const [doneFetching, setDoneFetching] = useState<boolean>(false);
  const fetching= useRef<boolean>(false);

  useEffect(() => {
    //effect to fetch chat history from the /api/messages/1 endpoint

    if(!fetching.current){
      fetchChatHistory(chatId);
      fetching.current=true;
    }

    async function fetchChatHistory(chatId: string) {
      await fetch("/api/messages/" + chatId).then((response) => {
        if (response.ok) {
          response.json().then(({ result }) => {
            setMessageHistory(result.map((messageObj : { name: string, time: number, text: string}) => {
              return {user: messageObj.name, timeStamp:messageObj.time, message: messageObj.text};
            }));
            setDoneFetching(true);
          });
        }
      });
    }
  }, [chatId]);



  return (
    <div>
      {doneFetching && <Chat chatId={chatId} preExistingMessages={messageHistory} />}
    </div>
  );
};

export default ChatPage;