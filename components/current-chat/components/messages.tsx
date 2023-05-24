import InfiniteScroll from "@/components/infinite-scroll";
import { messages, resetMessages, totalMessages } from "@/store/features/chats";
import { useGetMessageQuery } from "@/store/service/chats";
import { MessageType } from "@/store/types/chats";
import classNames from "classnames";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type PropsComponents = {
  chatId: string;
  className: string;
  receiver: string;
};

const Messages = ({ chatId, className, receiver }: PropsComponents) => {
  const infiniteScroll = useRef(null);
  const allMessages = useSelector(messages);
  const total = useSelector(totalMessages);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(resetMessages());
  }, [chatId, dispatch]);

  useEffect(() => {
    if (total && infiniteScroll?.current) {
      infiniteScroll.current.backToBottom();
    }
  }, [total]);
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
        key={chatId}
        scrollBack
      >
        {(data) => {
          return (
            <>
              <div className="px-5">
                {data.map((item: MessageType) => (
                  <div
                    key={item.id}
                    className={classNames("chat", {
                      "chat-start": receiver == item.receiver,
                      "chat-end": receiver != item.receiver,
                    })}
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
