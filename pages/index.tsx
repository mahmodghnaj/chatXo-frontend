import CurrentChat from "@/components/current-chat";
import Main from "@/components/layouts/main";
import { currentChat, localCurrentChat } from "@/store/features/chats";
import { useAddRoomMutation } from "@/store/service/chats";
import { SendMessageType } from "@/store/types/chats";
import { useSocketIoClient } from "@/utilities/common/hooks/use-socket-io";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const [value, setValue] = useState("");
  const client = useSocketIoClient();
  const current = useSelector(currentChat);
  const localCurrent = useSelector(localCurrentChat);
  const [addRoom, { isLoading: isAdding, isSuccess, data: newRoom }] =
    useAddRoomMutation();
  useEffect(() => {
    if (newRoom && isSuccess) {
      client?.send<SendMessageType>("message", {
        receiver: newRoom.user.id,
        room: newRoom.id,
        text: value,
      });
    }
  }, [isSuccess]);
  const send = (v: string) => {
    setValue(v);
    if (localCurrent) {
      addRoom({ user: localCurrent.id });
    } else if (current) {
      client?.send<SendMessageType>("message", {
        receiver: current.user.id,
        room: current.id,
        text: value,
      });
    }
  };

  return (
    <CurrentChat
      currentChat={current}
      localCurrentChat={localCurrent}
      send={send}
    />
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};

export default Home;
