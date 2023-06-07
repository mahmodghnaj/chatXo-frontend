import { chats, totalChats } from "@/store/features/chats";
import { useGetChatsQuery } from "@/store/service/chats";
import { ChatType } from "@/store/types/chats";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "../infinite-scroll";
import SvgIcon from "../../public/svg/add-chat.svg";
import Chat from "./components/chat";
type ComponentsProps = {
  changeTap: () => void;
};

const Chats: FC<ComponentsProps> = ({ changeTap }) => {
  const allChats = useSelector(chats);
  const total = useSelector(totalChats);
  const NoData: FC = () => {
    return (
      <>
        <div className="flex flex-col w-full h-full items-center justify-center">
          <SvgIcon className="h-16 w-16" />
          <div className="text-lg mt-3 font-mono text-accent-content">
            Start Chat With&nbsp;
            <span
              className="text-accent underline cursor-pointer"
              onClick={changeTap}
            >
              Friends
            </span>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <InfiniteScroll
        className="h-full overflow-y-auto"
        fetch={useGetChatsQuery}
        data={allChats}
        total={total}
        NoDataComponent={<NoData />}
      >
        {(data) =>
          data.map((item: ChatType) => {
            return <Chat key={item.id} chat={item} />;
          })
        }
      </InfiniteScroll>
    </>
  );
};
export default Chats;
