import { FC } from "react";

export type ComponentProps = {
  ok: () => void;
  cancel: () => void;
  loading: boolean;
  text?: string;
};
const CardWronging: FC<ComponentProps> = ({ ok, cancel, loading, text }) => {
  return (
    <>
      <div className="md:w-[500px] px-8 w-[400px] bg-base-300 rounded-lg flex justify-center items-center  min-h-[200px]">
        <div>
          <div className="text-2xl text-center mb-10">{text}</div>
          <div className="flex justify-center md:space-x-12  space-x-2">
            <button className="btn btn-outline" onClick={cancel}>
              Cancel
            </button>
            <button
              onClick={ok}
              className={`btn btn-error ${loading && "loading"}`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
CardWronging.defaultProps = {
  text: "Are you Sure ?",
};
export default CardWronging;
