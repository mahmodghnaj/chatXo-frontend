import InfiniteScroll from "@/components/InfiniteScroll";
import { messages, totalMessages } from "@/store/features/chats";
import { useGetMessageQuery } from "@/store/service/chats";
import { MessageType } from "@/store/types/chats";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

type PropsComponents = {
  chatId: string;
  className: string;
  receiver: string;
};

const Messages = ({ chatId, className, receiver }: PropsComponents) => {
  const infiniteScroll = useRef(null);
  const allMessages = useSelector(messages);
  const total = useSelector(totalMessages);
  return (
    <>
      <InfiniteScroll
        ref={infiniteScroll}
        fetch={useGetMessageQuery}
        data={allMessages}
        total={total}
        queryParams={chatId}
        className={className}
        focusLastItem
        scrollBack
      >
        {(data) => {
          return (
            <>
              <div>
                {data.map((item: MessageType) => (
                  <div
                    className={`chat chat-${
                      item.receiver == receiver ? "end" : "start"
                    }`}
                    key={item.id}
                  >
                    <div className="chat-bubble">{item.text}</div>
                  </div>
                ))}
              </div>
            </>
          );
        }}
      </InfiniteScroll>
    </>
  );
};
export default Messages;
