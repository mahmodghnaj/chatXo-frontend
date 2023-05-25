import LoadingSpinner from "@/components/loading-spinner";
import { useSearchFriendsMutation } from "@/store/service/profile";
import { MyProfileType } from "@/store/types/auth";
import { useDebounce } from "@/utilities/common/hooks/use-debounce";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Friend from "./components/friend";
import Header from "../header";
export type AddFriendsProps = {
  closeDialog: () => void;
};

const AddFriends = ({ closeDialog }: AddFriendsProps) => {
  const [query, setQuery] = useState("");
  const [searchFriends, { isLoading, data }] = useSearchFriendsMutation();
  const [listFriends, setListFriends] = useState<MyProfileType[]>([]);
  const searchQuery = useDebounce(query, 800);
  const handleSearch = (value: string) => {
    searchFriends({ name: value });
  };
  useEffect(() => {
    if (data) setListFriends(data?.data);
  }, [data]);
  useEffect(() => {
    if (searchQuery) handleSearch(searchQuery);
    else setListFriends([]);
  }, [searchQuery]);
  return (
    <>
      <div className="md:w-[700px]  bg-base-300 rounded-lg">
        <Header title="Add Friends" closeDialog={closeDialog} />
        <div className="divider"></div>
        <div className="p-4">
          <div className="relative ">
            <input
              type="text"
              placeholder="Search By Name"
              className="input w-full  input-md pr-10"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <div className="absolute inset-y-0 right-0 bottom-1 pr-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5" />
            </div>
          </div>
          <div className="relative flex overflow-y-auto h-[400px] max-h-max mt-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-full w-full">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex flex-col w-full p-4">
                {listFriends?.map((item) => (
                  <div key={item.id}>
                    <Friend friend={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFriends;
