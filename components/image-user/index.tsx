import { FC } from "react";
import SvgIcon from "../svg-icon";

type ComponentsProps = {
  status: "Online" | "Offline";
  classBorder?: string;
  classIcon?: string;
};

const ImageUser: FC<ComponentsProps> = ({ status, classBorder, classIcon }) => {
  return (
    <>
      <div className="relative">
        <SvgIcon
          className={`h-[45px] w-[45px] relative ${classIcon}`}
          filePath="/svg/person.svg"
        />
        <SvgIcon
          className={`-mb-[5px] -ml-[5px] bottom-0 absolute  h-[55px] w-[55px] ${classBorder}`}
          filePath={`/svg/${status == "Offline" ? "offline" : "online"}.svg`}
        />
      </div>
    </>
  );
};
export default ImageUser;
