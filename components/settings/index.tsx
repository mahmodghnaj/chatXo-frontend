import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import Account from "./components/account";
import General from "./components/general";
import Header from "./components/header";
export type SettingsProps = {
  closeDialog: () => void;
};
const Settings = ({ closeDialog }: SettingsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="md:w-[700px] w-[400px] bg-base-300 rounded-lg ">
        <Header closeDialog={closeDialog} />
        <div className="divider"></div>
        <div className="tabs p-4 ">
          <div
            onClick={() => setActiveTab(0)}
            className={`tab tab-lifted tab-lg ${
              activeTab === 0 && "tab-active"
            } `}
          >
            <AiOutlineSetting className="h-5 w-5 mr-1" />
            General
          </div>
          <div
            onClick={() => setActiveTab(1)}
            className={`tab tab-lifted tab-lg ${
              activeTab === 1 && "tab-active"
            }`}
          >
            <MdManageAccounts className="h-5 w-5 mr-1" /> Account
          </div>
        </div>
        <div className="flex-1 min-h-[460px] relative overflow-hidden px-4">
          {activeTab === 0 && <General />}
          {activeTab === 1 && <Account />}
        </div>
      </div>
    </>
  );
};

export default Settings;
