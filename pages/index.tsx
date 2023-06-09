import CurrentChat from "@/components/current-chat";
import Main from "@/components/layouts/main";
import {
  addNewMessage,
  changeStatusUser,
  chats as chatsData,
  currentChat,
  deleteAllChat,
  deleteChat,
  localCurrentChat,
  setLoadingDeleteAll,
} from "@/store/features/chats";
import {
  changeStatusFriend,
  mappingFriend,
  deleteLoadingMappingFriendId,
} from "@/store/features/profile";
import { useAddRoomMutation, useGetChatMutation } from "@/store/service/chats";
import { AddNewMessage, SendMessageType } from "@/store/types/chats";
import {
  ChangeStatusUser,
  MappingFriendType,
  User,
} from "@/store/types/profile";
import { useSocketIoClient } from "@/utilities/common/hooks/use-socket-io";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const [getChat, { isLoading }] = useGetChatMutation();
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState<AddNewMessage | null>(null);
  const client = useSocketIoClient();
  const current = useSelector(currentChat);
  const localCurrent = useSelector(localCurrentChat);
  const chats = useSelector(chatsData);
  const [addRoom, { isSuccess, data: newRoom }] = useAddRoomMutation();
  const dispatch = useDispatch();

  const isChatExists = (chatId: string) => {
    return chats.some((chat) => chat.id === chatId);
  };

  // Send message after creating a new chat room
  useEffect(() => {
    if (newRoom && isSuccess) {
      client?.send<SendMessageType>("message", {
        receiver: newRoom.user.id,
        room: newRoom.id,
        text: message,
      });
    }
  }, [isSuccess, newRoom]);

  // Send message
  const send = (v: string) => {
    setMessage(v);
    if (localCurrent) {
      addRoom({ user: localCurrent.id }); // If there is no existing chat between users
    } else if (current) {
      client?.send<SendMessageType>("message", {
        receiver: current.user.id,
        room: current.id,
        text: v,
      });
    }
  };

  useEffect(() => {
    client?.subscribe("deleteAllChat", () => {
      dispatch(deleteAllChat());
    });
    client?.subscribe("deleteChat", (res: { id: string; user: User }) => {
      dispatch(deleteChat(res.id));
    });
    client?.subscribe("message", (res: AddNewMessage) => setNewMessage(res));
    client?.subscribe("mappingFriend", (res: MappingFriendType) => {
      dispatch(deleteLoadingMappingFriendId(res.idFriend));
      dispatch(mappingFriend(res));
    });
    client?.subscribe("statusUser", (res: ChangeStatusUser) => {
      dispatch(changeStatusUser(res));
      dispatch(changeStatusFriend(res));
    });
  }, []);

  useEffect(() => {
    if (newMessage) {
      //dispatch(addNewMessage(newMessage));
      if (isChatExists(newMessage.idRoom)) {
        dispatch(addNewMessage(newMessage));
      } else {
        // Fetch the new chat room if it doesn't exist
        getChat(newMessage.idRoom);
      }
      setNewMessage(null);
    }
  }, [newMessage]);
  return (
    <>
      <Head>
        <title>ChatXo</title>
      </Head>
      <CurrentChat
        currentChat={current}
        localCurrentChat={localCurrent}
        send={send}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};

export default Home;
