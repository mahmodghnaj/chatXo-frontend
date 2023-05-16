import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Friends from "@/components/friends";
import Chats from "@/components/chats";
export type TabsType = {
  label: string;
  link: string;
  content: any;
};
const Sidebar = () => {
  const router = useRouter();
  const { pathname } = router;
  const [activeTab, setActiveTab] = useState(0);
  const tabs: TabsType[] = [
    { label: "Chats", link: "/", content: <Chats /> },
    { label: "friends", link: "/friends", content: <Friends /> },
  ];
  const handleClick = (tab: number) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="z-20 h-full flex flex-col bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 gap-2 py-2">
        <div className="flex">
          <Link href="/" className="flex btn btn-ghost  px-4">
            <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
              <span className="lowercase">Chat</span>
              <span className="text-base-content uppercase">XO</span>
            </div>
          </Link>
        </div>
        <div className="h-2" />
        <div className="tabs px-4">
          {tabs.map((tab, index) => (
            <Link
              key={index}
              href={tab.link}
              onClick={() => handleClick(index)}
              className={`tab tab-lifted tab-lg ${
                pathname == tab.link && "tab-active"
              }`}
            >
              {tab.label}
            </Link>
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
        <div>dddd</div>
      </div>
    </>
  );
};

export default Sidebar;
