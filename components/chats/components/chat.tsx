import CardWronging from "@/components/card-wronging";
import Dialog, { DialogRef } from "@/components/dialog";
import ImageUser from "@/components/image-user";
import TextOverflow from "@/components/text-overflow";
import {
  currentChat,
  setCurrentChat,
  loadingGetMessages,
  setLoadingDeleteChat,
  loadingDeleteChat,
} from "@/store/features/chats";
import { ChatType } from "@/store/types/chats";
import { getChatDate } from "@/utilities/common/date";
import { useRef, useState } from "react";
import { AiFillDelete, AiOutlineDown, AiOutlineSetting } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SvgIconReceived from "../../../public/svg/received.svg";
import SvgIconNoReceived from "../../../public/svg/no-received.svg";
import { useSocketIoClient } from "@/utilities/common/hooks/use-socket-io";
type ChatProps = {
  chat: ChatType;
};

const Chat = ({ chat }: ChatProps) => {
  const dispatch = useDispatch();
  const current = useSelector(currentChat);
  const loading = useSelector(loadingGetMessages);
  const [messageDelete, setMessageDelete] = useState<boolean>(false);
  const client = useSocketIoClient();
  const refDialog = useRef<DialogRef>(null);
  const loadingDelete = useSelector(loadingDeleteChat);
  const deleteChat = (id: string) => {
    dispatch(setLoadingDeleteChat(true));
    client?.send("deleteChat", id);
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <>
      <div
        onClick={() => !loading && dispatch(setCurrentChat(chat))}
        className={`transition duration-200 ease-in-out pl-4 pt-4 hover:bg-base-content group hover:bg-opacity-10 ${
          loading ? "cursor-wait" : "cursor-pointer"
        }  ${current?.id == chat.id && "bg-base-content bg-opacity-20"}`}
      >
        <div className="pr-4 flex items-center ">
          <ImageUser status={chat.user.status} />
          <div className="ml-2 flex justify-between items-center w-full">
            <div className="max-w-[5rem] sm:max-w-[10rem] md:max-w-[12rem] ">
              <TextOverflow
                className="text-lg capitalize font-extrabold"
                text={chat.user.firstName + " " + (chat.user?.lastName ?? "")}
              />
              <div className="flex items-center">
                {chat?.lastMessage?.receiver == chat.user.id && (
                  <div className="mr-1">
                    {chat?.lastMessage?.received ? (
                      <SvgIconReceived />
                    ) : (
                      <SvgIconNoReceived />
                    )}
                  </div>
                )}
                <TextOverflow
                  className="font-light"
                  text={chat?.lastMessage?.text}
                />
              </div>
            </div>

            <div className="text-base-content/70 text-sm flex flex-col">
              {getChatDate(new Date(chat?.lastMessage?.createdAt))}
              <div
                onClick={(e) => stopPropagation(e)}
                className="dropdown dropdown-left pl-2 pt-2 min-h-[22px]"
              >
                <label tabIndex={0} className="">
                  <AiOutlineDown className="h-4 w-4 cursor-pointer group-hover:block hidden" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content  menu px-2 pt-2 shadow bg-base-100 flex flex-col  rounded-box mb-2"
                >
                  <li
                    onClick={() => setMessageDelete(true)}
                    className="btn btn-ghost mb-4 capitalize flex flex-nowrap w-full whitespace-nowrap justify-start"
                  >
                    <AiFillDelete className="h-5 w-5 text-error mr-3" />
                    <div className="text-lg font-medium">Delete Chat</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`ml-8 pt-4 ${current?.id != chat.id && "divider"}`}
        ></div>
      </div>
      <Dialog
        open={messageDelete}
        ref={refDialog}
        handler={() => setMessageDelete(!messageDelete)}
      >
        <CardWronging
          loading={loadingDelete}
          ok={() => deleteChat(chat.id)}
          cancel={() => refDialog.current?.closeDialog()}
          text={`Delete For Me and "${chat.user.firstName}"`}
        />
      </Dialog>
    </>
  );
};

export default Chat;
