import { friends as friendsData, profile } from "@/store/features/profile";
import { useGetProfileQuery } from "@/store/service/profile";
import { ChangeEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import LoadingSpinner from "../loading-spinner";
import Friend from "./components/friend";

const Friends = () => {
  const info = useSelector(profile);
  const friendsList = useSelector(friendsData);
  const { isLoading, isFetching } = useGetProfileQuery(undefined, {
    skip: !!info,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredFriends = friendsList?.filter((friend) => {
    const fullName =
      friend.recipient.firstName + " " + friend.recipient.lastName;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  if (isLoading)
    return (
      <>
        <LoadingSpinner />
      </>
    );
  return (
    <>
      <div className="p-3 ">
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Search Friends"
            value={searchQuery}
            className="input w-full mb-2  input-md pr-10"
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 right-0 bottom-2 pr-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5" />
          </div>
        </div>
        {filteredFriends?.map((item) => (
          <div key={item.id}>
            <Friend friend={item} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Friends;
