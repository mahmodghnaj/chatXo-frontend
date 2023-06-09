import CardWronging from "@/components/card-wronging";
import Dialog, { DialogRef } from "@/components/dialog";
import ThemeChange from "@/components/theme-change";
import {
  chats,
  loadingDeleteAllChats,
  setLoadingDeleteAll,
} from "@/store/features/chats";
import { useSocketIoClient } from "@/utilities/common/hooks/use-socket-io";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const General = () => {
  const [messageDelete, setMessageDelete] = useState<boolean>(false);
  const refDialog = useRef<DialogRef>(null);
  const allChats = useSelector(chats);
  const loading = useSelector(loadingDeleteAllChats);
  const client = useSocketIoClient();
  const dispatch = useDispatch();
  const deleteAllChats = () => {
    dispatch(setLoadingDeleteAll(true));
    client?.send("deleteAllRooms", undefined);
  };
  useEffect(() => {
    if (!loading && messageDelete) {
      refDialog.current?.closeDialog();
    }
  }, [loading]);
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
          loading={loading}
          ok={() => deleteAllChats()}
          cancel={() => refDialog.current?.closeDialog()}
          text={"All conversations will be deleted for friends as well."}
        />
      </Dialog>
    </>
  );
};

export default General;
