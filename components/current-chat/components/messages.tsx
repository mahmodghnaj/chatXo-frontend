import InfiniteScroll from "@/components/infinite-scroll";
import { InfiniteScrollType } from "@/components/infinite-scroll/type";
import SvgIcon from "@/components/svg-icon";
import { messages, resetMessages, totalMessages } from "@/store/features/chats";
import { useGetMessageQuery } from "@/store/service/chats";
import { ChatType, MessageType } from "@/store/types/chats";
import classNames from "classnames";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type PropsComponents = {
  chat: ChatType;
  className: string;
  receiver: string;
};

const Messages = ({ chat, className, receiver }: PropsComponents) => {
  const infiniteScroll = useRef<InfiniteScrollType>(null);
  const allMessages = useSelector(messages);
  const total = useSelector(totalMessages);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(resetMessages());
  }, [chat.id, dispatch]);

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
        queryParams={chat.id}
        className={className}
        focusLastItem
        key={chat.id}
        scrollBack
      >
        {(data) => {
          return (
            <>
              <div className="px-3 py-2">
                {data.map((item: MessageType) => (
                  <div
                    key={item.id}
                    className={classNames("chat", {
                      "chat-end": receiver == item.receiver,
                      "chat-start": receiver != item.receiver,
                    })}
                  >
                    <div className="chat-bubble  break-words flex flex-col">
                      <div className="whitespace-pre-wrap"> {item.text}</div>
                      <div className="chat-footer opacity-50 flex items-center justify-end">
                        <div>10:10 pm </div>
                        {receiver == item.receiver && (
                          <div className="ml-1">
                            <SvgIcon
                              filePath={
                                item.received || chat.lastMessage.received
                                  ? "/svg/received.svg"
                                  : "/svg/no-received.svg"
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
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
