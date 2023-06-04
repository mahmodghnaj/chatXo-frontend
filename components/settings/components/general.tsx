import CardWronging from "@/components/card-wronging";
import Dialog, { DialogRef } from "@/components/dialog";
import ThemeChange from "@/components/theme-change";
import { chats } from "@/store/features/chats";
import { useDeleteAllChatsMutation } from "@/store/service/chats";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const General = () => {
  const [deleteAllChats, { isLoading, isSuccess }] =
    useDeleteAllChatsMutation();
  const [messageDelete, setMessageDelete] = useState<boolean>(false);
  const refDialog = useRef<DialogRef>(null);
  const allChats = useSelector(chats);
  useEffect(() => {
    if (isSuccess) {
      setMessageDelete(false);
    }
  }, [isSuccess]);
  return (
    <>
      <div className="w-full  flex justify-between items-center px-3">
        <div className="text-xl font-bold">Theme</div>
        <ThemeChange showNameTheme />
      </div>
      <div className="divider my-6 "></div>
      <div className="w-full flex justify-between items-center px-3">
        <div className="text-xl font-bold">Clear all chats</div>
        <button
          onClick={() => setMessageDelete(true)}
          disabled={!allChats.length}
          className="btn btn-error  capitalize"
        >
          Clear
        </button>
      </div>
      <div className="divider my-6 "></div>
      <Dialog
        open={messageDelete}
        ref={refDialog}
        handler={() => setMessageDelete(!messageDelete)}
      >
        <CardWronging
          loading={isLoading}
          ok={() => deleteAllChats()}
          cancel={() => refDialog.current?.closeDialog()}
        />
      </Dialog>
    </>
  );
};

export default General;
