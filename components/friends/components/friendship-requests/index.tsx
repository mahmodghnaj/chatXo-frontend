import { friendshipRequests } from "@/store/features/profile";
import { useSelector } from "react-redux";
import Friend from "./components/friend";
import Header from "../header";
export type AddFriendsProps = {
  closeDialog: () => void;
};

const FriendshipRequests = ({ closeDialog }: AddFriendsProps) => {
  const friends = useSelector(friendshipRequests);
  return (
    <>
      <div className="md:w-[700px]  bg-base-300 rounded-lg">
        <Header title="Friendship Requests" closeDialog={closeDialog} />
        <div className="divider"></div>
        <div className="relative  flex overflow-y-auto h-[400px] max-h-max mt-2">
          <div className="flex flex-col w-full p-4">
            {friends?.map((item) => (
              <div key={item.id}>
                <Friend friend={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendshipRequests;
