import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import Dialog from "@/components/dialog";
import Settings from "@/components/settings";

const InfoUser = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <>
      <div className="h-16 flex justify-center items-center border-t-success border-t-2 px-3 ">
        <div className="dropdown dropdown-top  w-full h-8 ">
          <label tabIndex={0} className="btn w-full">
            <div className="flex w-full justify-between">
              <div> Mahmod Ghnaj</div>
              <div>
                <CiMenuKebab className="h-4 w-4" />
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content w-full menu p-2 shadow bg-base-100 flex flex-col  rounded-box mb-2"
          >
            <li
              onClick={() => setShowDialog(true)}
              className="btn btn-ghost mb-4 capitalize flex w-full justify-start"
            >
              <AiOutlineSetting className="h-7 w-7 mr-3" />
              <div className="text-lg font-medium">Settings</div>
            </li>
            <li className="btn btn-ghost mb-4 capitalize flex w-full justify-start">
              <FiLogOut className="h-7 w-7 mr-3" />
              <div className="text-lg font-medium"> Logout</div>
            </li>
          </ul>
        </div>
      </div>
      <Dialog open={showDialog} handler={() => setShowDialog(!showDialog)}>
        <Settings closeDialog={() => setShowDialog(!showDialog)} />
      </Dialog>
    </>
  );
};
export default InfoUser;
