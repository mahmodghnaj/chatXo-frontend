import { currentChat } from "@/store/features/chats";
import { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FcMenu } from "react-icons/fc";
import { useSelector } from "react-redux";
import Portal from "../portal";
import PortalRoot from "../portal-root";
import Header from "./components/header";
import NoData from "./components/no-data";

const CurrentChat = () => {
  const current = useSelector(currentChat);
  const [showPortalRoot, setShowPortalRoot] = useState<boolean>(false);
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
              name={current?.user.firstName + " " + current?.user.lastName}
            />
            <div className="flex-1">messages</div>
            <div className="p-2 relative bg-base-300 py-3">
              <input
                className="input w-full  input-md"
                placeholder="Type a message"
                type="text"
              />
              <button className="absolute top-6 right-2 btn btn-square btn-xs btn-ghost">
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
