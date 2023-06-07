import ImageUser from "@/components/image-user";
import TextOverflow from "@/components/text-overflow";
import {
  friends as friendsData,
  friendshipRequests,
  friendsSending as friendsSendingData,
  loadingMappingFriend,
} from "@/store/features/profile";
import { MappingFriendType, MyProfileType } from "@/store/types/profile";
import { useSelector } from "react-redux";

export type ComponentProps = {
  friend: MyProfileType;
  mappingFriend: (arg: MappingFriendType) => void;
};
const Friend = ({ friend, mappingFriend }: ComponentProps) => {
  const loading = useSelector(loadingMappingFriend);
  const friends = useSelector(friendsData);
  const friendRequests = useSelector(friendshipRequests);
  const friendsSending = useSelector(friendsSendingData);
  const isFriend = friends
    ?.map((item) => item.recipient.id)
    .includes(friend.id);
  const isRequest = friendRequests
    ?.map((item) => item.recipient.id)
    .includes(friend.id);
  const isSending = friendsSending
    ?.map((item) => item.recipient.id)
    .includes(friend.id);
  const send = !isFriend && !isRequest && !isSending;
  return (
    <>
      <div className="flex w-full items-center  justify-between mb-2">
        <div className=" flex items-center">
          <ImageUser status={friend.status} />
          <div className="ml-2 max-w-[5rem] sm:max-w-[16rem]   md:max-w-[18rem] text-lg font-extrabold">
            <TextOverflow text={friend.firstName + " " + friend?.lastName} />
          </div>
        </div>
        {isFriend && (
          <button
            className={`btn btn-outline capitalize`}
            disabled
            type="button"
          >
            Your Friend
          </button>
        )}
        {isRequest && (
          <div className="flex space-x-1">
            <button
              onClick={() =>
                mappingFriend({ idFriend: friend.id, type: "accept" })
              }
              className={`btn btn-accent  capitalize ${loading && "loading"}`}
              type="button"
            >
              Accept
            </button>
            <button
              onClick={() =>
                mappingFriend({ idFriend: friend.id, type: "reject" })
              }
              className={`btn btn-accent  capitalize ${loading && "loading"}`}
              type="button"
            >
              Reject
            </button>
          </div>
        )}
        {isSending && (
          <div className="flex space-x-1 group relative">
            <button
              className={`btn btn-secondary capitalize opacity-100 ${
                loading && "loading"
              } group-hover:opacity-0 duration-300`}
              type="button"
            >
              Pending
            </button>
            <button
              className={`btn ${
                loading && "loading"
              } btn-error capitalize opacity-0 group-hover:opacity-100 duration-300 absolute inset-x-0 bottom-0`}
              type="button"
              onClick={() =>
                mappingFriend({ idFriend: friend.id, type: "reject" })
              }
            >
              Cancel
            </button>
          </div>
        )}
        {send && (
          <button
            onClick={() => mappingFriend({ idFriend: friend.id, type: "add" })}
            className={`btn btn-success ${loading && "loading"} capitalize`}
            type="button"
          >
            Add
          </button>
        )}
      </div>
      <div className="divider my-4"></div>
    </>
  );
};
export default Friend;
