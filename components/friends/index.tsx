import {
  addLoadingMappingFriendId,
  friends as friendsData,
  friendshipRequests,
} from "@/store/features/profile";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Friend from "./components/friend";
import { BiGitPullRequest } from "react-icons/bi";
import Dialog, { DialogRef } from "../dialog";
import AddFriends from "./components/add-friends";
import FriendshipRequests from "./components/friendship-requests";
import { useSocketIoClient } from "@/utilities/common/hooks/use-socket-io";
import { MappingFriendType } from "@/store/types/profile";
import SvgIcon from "../../public/svg/add-friend.svg";

const Friends = () => {
  const dispatch = useDispatch();
  const client = useSocketIoClient();
  const [dialogAddFriends, setDialogAddFriends] = useState<boolean>(false);
  const [dialogFriendshipRequests, setDialogFriendshipRequests] =
    useState<boolean>(false);

  const refDialogAddFriends = useRef<DialogRef>(null);
  const refFriendshipRequests = useRef<DialogRef>(null);

  const friendsList = useSelector(friendsData);
  const friendship = useSelector(friendshipRequests);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredFriends = friendsList?.filter((friend) => {
    const fullName =
      friend.recipient.firstName + " " + (friend.recipient?.lastName ?? "");
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const mappingFriend = (arg: MappingFriendType) => {
    dispatch(addLoadingMappingFriendId(arg.idFriend));
    client?.send<MappingFriendType>("mappingFriend", arg);
  };

  return (
    <>
      <div className="px-3 pb-3 pt-3 ">
        <div className="flex items-center mb-4">
          <div className="relative ">
            <input
              type="text"
              placeholder="Search Friends"
              value={searchQuery}
              className="input w-full  input-md pr-10"
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 right-0 bottom-2 pr-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5" />
            </div>
          </div>
          <button
            onClick={() => setDialogAddFriends(true)}
            className="btn btn-square mx-1"
          >
            <BsPersonFillAdd className="h-6 w-6" />
          </button>
          <div className="indicator">
            <button
              onClick={() => setDialogFriendshipRequests(true)}
              className="btn btn-square  mx-1"
            >
              <BiGitPullRequest className="h-6 w-6" />
            </button>
            {friendship?.length !== 0 && (
              <span className="indicator-item border-secondary rounded-badge bg-secondary text-secondary-content  h-5 text-sm leading-5 pl-[0.563rem] pr-[0.563rem]">
                {friendship?.length}
              </span>
            )}
          </div>
        </div>
        <>
          {!!friendsList?.length ? (
            filteredFriends?.map((item) => (
              <div key={item.id}>
                <Friend friend={item} />
              </div>
            ))
          ) : (
            <div className="flex h-full w-full flex-col justify-center items-center">
              <SvgIcon className="h-24 w-24 mt-8" />
              <div className="text-lg mt-3 font-mono text-accent-content">
                Start Add New&nbsp;
                <span
                  className="text-accent underline cursor-pointer"
                  onClick={() => setDialogAddFriends(true)}
                >
                  Friends
                </span>
              </div>
            </div>
          )}
        </>
      </div>

      <Dialog
        open={dialogAddFriends}
        handler={() => setDialogAddFriends(!dialogAddFriends)}
        ref={refDialogAddFriends}
      >
        <AddFriends
          closeDialog={() => refDialogAddFriends.current?.closeDialog()}
          mappingFriend={(arg) => mappingFriend(arg)}
        />
      </Dialog>
      <Dialog
        open={dialogFriendshipRequests}
        handler={() => setDialogFriendshipRequests(!dialogFriendshipRequests)}
        ref={refFriendshipRequests}
      >
        <FriendshipRequests
          closeDialog={() => refFriendshipRequests.current?.closeDialog()}
          mappingFriend={(arg) => mappingFriend(arg)}
        />
      </Dialog>
    </>
  );
};
export default Friends;
