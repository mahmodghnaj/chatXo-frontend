import { friendshipRequests } from "@/store/features/profile";
import { useSelector } from "react-redux";
import Friend from "./components/friend";
import Header from "../header";
import SvgIcon from "../../../../public/svg/no-data.svg";

import { MappingFriendType } from "@/store/types/profile";
export type AddFriendsProps = {
  closeDialog: () => void;
  mappingFriend: (arg: MappingFriendType) => void;
};

const FriendshipRequests = ({
  closeDialog,
  mappingFriend,
}: AddFriendsProps) => {
  const friends = useSelector(friendshipRequests);
  return (
    <>
      <div className="md:w-[700px] w-auto sm:w-[500px]  bg-base-300 rounded-lg">
        <Header title="Friendship Requests" closeDialog={closeDialog} />
        <div className="divider"></div>
        {friends?.length ? (
          <div className="relative  flex overflow-y-auto h-[400px] max-h-max mt-2">
            <div className="flex flex-col w-full p-4">
              {friends?.map((item) => (
                <div key={item.id}>
                  <Friend
                    mappingFriend={(arg) => mappingFriend(arg)}
                    friend={item}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-[400px] flex flex-col justify-center items-center">
            <SvgIcon className="h-[180px] w-[250px] " />
            <div className="text-center text-lg md:text-2xl font-serif">
              Not Have Friendship Requests
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FriendshipRequests;
