import { FC } from "react";
import SvgIcon from "../../public/svg/person.svg";
import SvgIconOffline from "../../public/svg/offline.svg";
import SvgIconOnline from "../../public/svg/online.svg";

type ComponentsProps = {
  status: "Online" | "Offline";
  classBorder?: string;
  classIcon?: string;
};

const ImageUser: FC<ComponentsProps> = ({ status, classBorder, classIcon }) => {
  return (
    <>
      <div className="relative">
        <SvgIcon className={`h-[45px] w-[45px] relative ${classIcon}`} />
        {status == "Offline" ? (
          <SvgIconOffline
            className={`-mb-[5px] -ml-[5px] bottom-0 absolute  h-[55px] w-[55px] ${classBorder}`}
          />
        ) : (
          <SvgIconOnline
            className={`-mb-[5px] -ml-[5px] bottom-0 absolute  h-[55px] w-[55px] ${classBorder}`}
          />
        )}
      </div>
    </>
  );
};
export default ImageUser;
