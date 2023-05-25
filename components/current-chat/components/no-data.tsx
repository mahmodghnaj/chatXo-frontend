import SvgIcon from "@/components/svg-icon";

const NoData = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="font-title mb-6 text-primary text-4xl font-extrabold sm:text-5xl lg:text-6xl">
          <span> Chat</span>
          <span className="text-base-content">Xo</span>
        </h1>
        <SvgIcon filePath="/svg/no-data.svg" />
        <h2 className="font-medium  text-info mt-6  text-sm  sm:text-xl lg:text-2xl max-w-3xl">
          Send and receive messages with your friends
        </h2>
      </div>
    </>
  );
};

export default NoData;
