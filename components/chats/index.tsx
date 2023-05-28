import { chats, totalChats } from "@/store/features/chats";
import { useGetChatsQuery } from "@/store/service/chats";
import { ChatType } from "@/store/types/chats";
import { FC } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "../infinite-scroll";
import Chat from "./components/chat";
const Chats = () => {
  const allChats = useSelector(chats);
  const total = useSelector(totalChats);

  return (
    <>
      <InfiniteScroll
        className="h-full overflow-y-auto"
        fetch={useGetChatsQuery}
        data={allChats}
        total={total}
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
