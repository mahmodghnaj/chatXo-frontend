import ThemeChange from "@/components/theme-change";
import { ReactElement } from "react";
type componentProps = {
  children: ReactElement;
};
const AuthLayout = ({ children }: componentProps) => {
  return (
    <>
      <div className="h-screen grid from-primary to-secondary bg-gradient-to-br">
        <div className="col-start-1 z-2 flex justify-end p-4 row-start-1 self-start">
          <ThemeChange />
        </div>
        <div className=" col-start-1 row-start-1 z-10 flex justify-center  items-center">
          {children}
        </div>
        <svg
          className="fill-secondary col-start-1 row-start-1 self-end h-auto w-full justify-self-end"
          width="1600"
          height="595"
          viewBox="0 0 1600 595"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 338L53.3 349.2C106.7 360.3 213.3 382.7 320 393.8C426.7 405 533.3 405 640 359.3C746.7 313.7 853.3 222.3 960 189.2C1066.7 156 1173.3 181 1280 159.2C1386.7 137.3 1493.3 68.7 1546.7 34.3L1600 0V595H1546.7C1493.3 595 1386.7 595 1280 595C1173.3 595 1066.7 595 960 595C853.3 595 746.7 595 640 595C533.3 595 426.7 595 320 595C213.3 595 106.7 595 53.3 595H0V338Z" />
        </svg>
      </div>
    </>
  );
};

export default AuthLayout;
