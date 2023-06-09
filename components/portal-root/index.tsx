import { currentChat, localCurrentChat } from "@/store/features/chats";
import { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useSelector } from "react-redux";
import Sidebar from "@/components/sidebar";

type PropsComponent = {
  setShowPortalRoot: () => void;
};

const PortalRoot = ({ setShowPortalRoot }: PropsComponent) => {
  const [mounted, setMounted] = useState(false);
  const current = useSelector(currentChat);
  const localChat = useSelector(localCurrentChat);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const hidePortalRoot = (event: React.MouseEvent<HTMLElement> | null) => {
    event && event.stopPropagation();
    setMounted(false);
    setTimeout(() => {
      setShowPortalRoot();
    }, 320);
  };
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  useEffect(() => {
    if ((current || localChat) && mounted) {
      hidePortalRoot(null);
    }
  }, [current, localChat]);
  return (
    <>
      <div className="relative" role={"dialog"} aria-modal="true">
        <div
          className={`fixed inset-0 bg-gray-600 transition-opacity duration-300 ease-in-out ${
            mounted ? "bg-opacity-75" : "bg-opacity-0"
          } opacity-100`}
        ></div>
        <div onClick={hidePortalRoot} className="fixed flex inset-0">
          <div
            onClick={stopPropagation}
            className={`relative flex w-full max-w-xs flex-1  flex-col transition-transform duration-300 ease-in-out ${
              mounted ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="absolute right-0 top-0 -mr-12 pt-2 opacity-100">
              <button
                onClick={hidePortalRoot}
                className="btn btn-square btn-md btn-ghost"
              >
                <TfiClose />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};
export default PortalRoot;
