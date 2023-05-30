import ImageUser from "@/components/image-user";
import SvgIcon from "@/components/svg-icon";
import TextOverflow from "@/components/text-overflow";
import {
  currentChat,
  setCurrentChat,
  loadingGetMessages,
} from "@/store/features/chats";
import { ChatType } from "@/store/types/chats";
import { getChatDate } from "@/utilities/common/date";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

type ChatProps = {
  chat: ChatType;
};

const Chat = ({ chat }: ChatProps) => {
  const dispatch = useDispatch();
  const current = useSelector(currentChat);
  const loading = useSelector(loadingGetMessages);
  return (
    <>
      <div
        onClick={() => !loading && dispatch(setCurrentChat(chat))}
        className={`transition duration-200 ease-in-out pl-4 pt-4 hover:bg-base-content hover:bg-opacity-10 ${
          loading ? "cursor-wait" : "cursor-pointer"
        }  ${current?.id == chat.id && "bg-base-content bg-opacity-20"}`}
      >
        <div className="pr-4 flex items-center ">
          <ImageUser status={chat.user.status} />
          <div className="ml-2 flex justify-between items-center w-full">
            <div className="max-w-[5rem] sm:max-w-[10rem] md:max-w-[12rem] ">
              <TextOverflow
                className="text-lg font-extrabold"
                text={chat.user.firstName + " " + chat.user.lastName}
              />
              <TextOverflow
                className="font-light "
                text={chat?.lastMessage?.text}
              />
            </div>

            <div className="text-base-content/70 text-sm ">
              {getChatDate(new Date(chat?.lastMessage?.createdAt))}
            </div>
          </div>
        </div>
        <div
          className={`ml-8 pt-4 ${current?.id != chat.id && "divider"}`}
        ></div>
      </div>
    </>
  );
};

export default Chat;
