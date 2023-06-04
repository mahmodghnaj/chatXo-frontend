import { FC } from "react";

export type ComponentProps = {
  ok: () => void;
  cancel: () => void;
  loading: boolean;
};
const CardWronging: FC<ComponentProps> = ({ ok, cancel, loading }) => {
  return (
    <>
      <div className="md:w-[500px] w-[200px] bg-base-300 rounded-lg flex justify-center items-center  min-h-[200px]">
        <div>
          <div className="text-2xl text-center mb-10">Are You Sure ?</div>
          <div className="flex space-x-12">
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

export default CardWronging;
