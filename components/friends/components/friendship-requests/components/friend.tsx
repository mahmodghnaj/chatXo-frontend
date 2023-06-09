import ImageUser from "@/components/image-user";
import TextOverflow from "@/components/text-overflow";
import { loadingMappingFriendId } from "@/store/features/profile";
import { Friend as FriendType, MappingFriendType } from "@/store/types/profile";
import { useSelector } from "react-redux";
export type ComponentProps = {
  friend: FriendType;
  mappingFriend: (arg: MappingFriendType) => void;
};
const Friend = ({ friend, mappingFriend }: ComponentProps) => {
  const loading = useSelector(loadingMappingFriendId);

  return (
    <>
      <div className="flex w-full items-center  justify-between mb-2">
        <div className=" flex items-center">
          <ImageUser status={friend.recipient.status} />
          <div className="ml-2 max-w-[5rem] sm:max-w-[16rem]   md:max-w-[18rem] text-lg font-extrabold">
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
        <div className="flex p-2 space-x-2">
          <button
            onClick={() =>
              mappingFriend({ idFriend: friend.recipient.id, type: "accept" })
            }
            className={`btn btn-success btn-md capitalize ${
              loading.includes(friend.recipient.id) && "loading"
            }`}
            type="button"
          >
            Accept
          </button>
          <button
            onClick={() =>
              mappingFriend({ idFriend: friend.recipient.id, type: "reject" })
            }
            className={`btn btn-error btn-md capitalize ${
              loading.includes(friend.recipient.id) && "loading"
            }`}
            type="button"
          >
            Reject
          </button>
        </div>
      </div>
      <div className="divider my-4"></div>
    </>
  );
};
export default Friend;
