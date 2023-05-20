import { currentChat, resetMessages } from "@/store/features/chats";
import { SendMessageType } from "@/store/types/chats";
import { useSocketIoClient } from "@/utilities/common/hooks/use-socket-io";
import { ChangeEvent, useRef } from "react";
import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FcMenu } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Portal from "../portal";
import PortalRoot from "../portal-root";
import Header from "./components/header";
import Messages from "./components/messages";
import NoData from "./components/no-data";

const CurrentChat = () => {
  const client = useSocketIoClient();
  const refInput = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const current = useSelector(currentChat);
  const [showPortalRoot, setShowPortalRoot] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (current) {
      dispatch(resetMessages());
    }
  }, [current]);

  const send = () => {
    if (current)
      client.send<SendMessageType>("message", {
        receiver: current.user.id,
        room: current.id,
        text: value,
      });
    setValue("");
  };
  const sendMessage = (event: KeyboardEvent<HTMLTextAreaElement> | null) => {
    if (!event) send();
    if (event && event.key === "Enter" && !event.shiftKey) {
      if (current) send();
      event.preventDefault();
      if (refInput.current) refInput.current.style.height = "3rem";
    } else {
      if (refInput.current && event) {
        refInput.current.style.height = "auto";
        refInput.current.style.height = `${
          event.currentTarget.scrollHeight - 16
        }px`;
      }
    }
  };
  return (
    <>
      <div className="flex flex-col h-full w-full relative">
        <button
          onClick={() => setShowPortalRoot(!showPortalRoot)}
          className="md:hidden absolute top-2 btn btn-square btn-ghost"
        >
          <FcMenu className="h-6 w-6" />
        </button>
        {current ? (
          <>
            <Header
              name={current.user.firstName + " " + current.user.lastName}
            />
            <Messages
              className="flex-1 overflow-y-auto"
              receiver={current.user.id}
              chatId={current.id}
            />
            <div className="p-2 relative  bg-base-300 py-2">
              <textarea
                className="textarea  w-full max-h-[150px] placeholder-shown:text-sm text-xl resize-none"
                placeholder="Type a message"
                value={value}
                ref={refInput}
                rows={1}
                tabIndex={0}
                onKeyDown={(event) => sendMessage(event)}
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                onClick={() => sendMessage(null)}
                disabled={!value}
                className="absolute   bottom-8 right-6 btn btn-square btn-xs btn-ghost"
              >
                <BsSend className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <NoData />
        )}
      </div>

      {showPortalRoot && (
        <Portal>
          <PortalRoot setShowPortalRoot={() => setShowPortalRoot(false)} />
        </Portal>
      )}
    </>
  );
};

export default CurrentChat;
