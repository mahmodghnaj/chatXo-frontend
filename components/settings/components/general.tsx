import ThemeChange from "@/components/theme-change";

const General = () => {
  return (
    <>
      <div className="w-full  flex justify-between items-center px-3">
        <div className="text-xl font-bold">Theme</div>
        <ThemeChange showNameTheme />
      </div>
      <div className="divider my-6 "></div>
      <div className="w-full flex justify-between items-center px-3">
        <div className="text-xl font-bold">Clear all chats</div>
        <button className="btn btn-error  capitalize">Clear</button>
      </div>
      <div className="divider my-6 "></div>
      <div className="w-full flex justify-between items-center px-3">
        <div className="text-xl font-bold">Clear all Friends</div>
        <button className="btn btn-error capitalize">Clear</button>
      </div>
    </>
  );
};

export default General;
