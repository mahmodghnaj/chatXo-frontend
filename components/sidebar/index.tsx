import Link from "next/link";
import { useState } from "react";
import Friends from "@/components/friends";
import Chats from "@/components/chats";
import InfoUser from "./components/info-user";
import { friendshipRequests } from "@/store/features/profile";
import { useSelector } from "react-redux";

export type TabsType = {
  label: string;
  content: any;
};
const Sidebar = () => {
  const friendship = useSelector(friendshipRequests);
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs: TabsType[] = [
    { label: "Chats", content: <Chats changeTap={() => setActiveTab(1)} /> },
    { label: "friends", content: <Friends /> },
  ];
  const handleClick = (tab: number) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="z-20 h-full flex flex-col bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 gap-2 py-2">
        <div className="flex">
          <Link href="/" className="flex btn btn-ghost  px-4">
            <div className="font-title text-primary inline-flex text-4xl transition-all duration-200 md:text-3xl">
              <span className="lowercase">Chat</span>
              <span className="text-base-content uppercase">XO</span>
            </div>
          </Link>
        </div>
        <div className="h-2" />
        <div className="tabs px-4 tabs-boxed indicator w-full">
          {!!friendship?.length && (
            <div className="indicator-item mr-3 border-secondary rounded-badge bg-secondary text-secondary-content  h-5 text-sm leading-5 pl-[0.563rem] pr-[0.563rem]">
              {friendship?.length}
            </div>
          )}
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`tab tab-lifted tab-lg  ${
                index === activeTab && "tab-active"
              } `}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="flex-1 relative overflow-hidden">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`h-full ${index === activeTab ? " block" : " hidden"}`}
            >
              {tab.content}
            </div>
          ))}
        </div>
        <InfoUser />
      </div>
    </>
  );
};

export default Sidebar;
