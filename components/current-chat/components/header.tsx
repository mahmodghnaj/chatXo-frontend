import ImageUser from "@/components/image-user";
import TextOverflow from "@/components/text-overflow";
import { getLastSeen } from "@/utilities/common/date";

type ComponentProps = {
  name: string;
  lastSeen?: Date;
  status?: "Online" | "Offline";
};
const Header = ({ name, lastSeen, status }: ComponentProps) => {
  return (
    <>
      <div className="h-[70px] bg-base-300 flex items-center  md:p-5 pl-14 pr-5">
        {status && <ImageUser status={status} />}
        <div className="ml-2 flex justify-between items-center w-full">
          <div>
            <div className="text-lg max-w-[5rem] sm:max-w-[16rem] md:max-w-[18rem] font-extrabold flex flex-col">
              <TextOverflow className="capitalize" text={name} />
            </div>
            <div>
              {status == "Online" ? (
                <div className="font-bold text-sm text-success">Online</div>
              ) : (
                lastSeen && (
                  <div className="text-sm text-base-content font-light">
                    {getLastSeen(lastSeen)}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
