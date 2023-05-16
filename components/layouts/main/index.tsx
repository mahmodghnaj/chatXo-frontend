import { ReactElement } from "react";
import Sidebar from "./components/sidebar";

type componentProps = {
  children: ReactElement;
};
const Main = ({ children }: componentProps) => {
  return (
    <>
      <div className="bg-base-100 overflow-hidden w-full h-full relative flex z-0">
        <div className="flex-shrink-0 overflow-x-hidden bg-base-200 w-80 h-full">
          <div className="flex h-full min-h-0 flex-col">
            <nav className="scrollbar-trigger relative h-full w-full flex-1 items-start">
              <Sidebar />
            </nav>
          </div>
        </div>
        <div className="flex-shrink-0 overflow-x-hidden">
          <main className="relative h-full w-full transition-width flex flex-col overflow-hidden flex-1">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Main;
