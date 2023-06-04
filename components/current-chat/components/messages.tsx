import InfiniteScroll from "@/components/infinite-scroll";
import { InfiniteScrollType } from "@/components/infinite-scroll/type";

import { messages, resetMessages, totalMessages } from "@/store/features/chats";
import { useGetMessageQuery } from "@/store/service/chats";
import { ChatType, MessageType } from "@/store/types/chats";
import { getMessageLabel, getTime12 } from "@/utilities/common/date";
import classNames from "classnames";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgIconReceived from "../../../public/svg/received.svg";
import SvgIconNoReceived from "../../../public/svg/no-received.svg";

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

  const groupMessagesByDay = (messages: MessageType[]) => {
    const groups: { [key: string]: MessageType[] } = {};
    messages.forEach((message) => {
      const createdAt = new Date(message.createdAt);
      let formattedDate = getMessageLabel(createdAt);
      if (groups[formattedDate]) {
        groups[formattedDate].push(message);
      } else {
        groups[formattedDate] = [message];
      }
    });
    return Object.entries(groups);
  };

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
              {groupMessagesByDay(data).map(([date, messages], index) => (
                <div key={index}>
                  <div className="px-3 py-4">
                    <div className=" flex items-center justify-center">
                      <div className="bg-base-200 p-2 rounded-lg text-base-content">
                        {date}
                      </div>
                    </div>
                    {messages.map((item: MessageType) => (
                      <div
                        key={item.id}
                        className={classNames("chat", {
                          "chat-end": receiver == item.receiver,
                          "chat-start": receiver != item.receiver,
                        })}
                      >
                        <div className="chat-bubble  break-words	flex flex-col">
                          <div className="whitespace-pre-wrap">{item.text}</div>
                          <div className="chat-footer opacity-50 flex items-center justify-end">
                            <div>{getTime12(new Date(item.createdAt))} </div>
                            {receiver == item.receiver && (
                              <div className="ml-1">
                                {item.received ||
                                chat?.lastMessage?.received ? (
                                  <SvgIconReceived />
                                ) : (
                                  <SvgIconNoReceived />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          );
        }}
      </InfiniteScroll>
    </>
  );
};
export default Messages;
