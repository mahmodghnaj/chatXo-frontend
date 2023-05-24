export type HeaderProps = {
  closeDialog: () => void;
};
const Header = ({ closeDialog }: HeaderProps) => {
  return (
    <>
      <div className="p-5  flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-medium leading-6 text-base-content">
              Settings
            </h2>
          </div>
        </div>
        <button onClick={closeDialog} className="btn btn-ghost btn-sm">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-base-content"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Header;
