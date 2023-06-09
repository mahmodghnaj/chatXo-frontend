import ImageUser from "@/components/image-user";
import TextOverflow from "@/components/text-overflow";
import {
  chats,
  currentChat as currentChatData,
  setCurrentChat,
  setLocalCurrentChat,
} from "@/store/features/chats";
import { useCheckChatMutation } from "@/store/service/chats";
import { Friend } from "@/store/types/profile";
import { useEffect } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

export type ComponentProps = {
  friend: Friend;
};
const Friend = ({ friend }: ComponentProps) => {
  const [checkChat, { isLoading, isSuccess }] = useCheckChatMutation();
  const dispatch = useDispatch();
  const currentChat = useSelector(currentChatData);
  const allChats = useSelector(chats);

  const checkLocal = () => {
    const index = allChats.findIndex(
      (item) => item.user.id === friend.recipient.id
    );
    if (index === -1) return null;
    dispatch(setCurrentChat(allChats[index]));
  };
  const goToChat = () => {
    const check = checkLocal();
    if (check === null) checkChat(friend.recipient.id);
  };
  useEffect(() => {
    if (isSuccess) {
      // don't have any chat before
      dispatch(setCurrentChat(null));
      dispatch(
        setLocalCurrentChat({
          id: friend.recipient.id,
          firstName: friend.recipient.firstName,
          lastName: friend.recipient?.lastName,
          status: friend.recipient.status,
          lastSeenAt: friend.recipient.lastSeenAt,
        })
      );
    }
  }, [isSuccess]);
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <ImageUser status={friend.recipient.status} />
          <div className="ml-2 max-w-[8rem] text-lg font-extrabold">
            <TextOverflow
              className="capitalize"
              text={
                friend.recipient.firstName +
                " " +
                (friend.recipient?.lastName ?? "")
              }
            />
          </div>
        </div>
        <div className="flex flex-nowrap">
          <button
            className={`btn btn-outline btn-sm capitalize ${
              isLoading && "loading"
            }`}
            onClick={() => goToChat()}
            type="button"
          >
            <FiMessageSquare className="mr-1" />
            Message
          </button>
        </div>
      </div>
      <div className="divider my-3"></div>
    </>
  );
};

export default Friend;
