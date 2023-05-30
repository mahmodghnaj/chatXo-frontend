import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  Ref,
} from "react";
import Portal from "../portal";

interface DialogProps {
  open: boolean;
  handler: () => void;
  children: React.ReactNode;
}

export interface DialogRef {
  closeDialog: () => void;
}

const Dialog = forwardRef<DialogRef, DialogProps>(
  ({ open, handler, children }, ref) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      if (open) {
        setMounted(true);
      } else {
        setMounted(false);
      }
    }, [open]);

    const hideDialog = (event: React.MouseEvent<HTMLElement> | null) => {
      event && event.stopPropagation();
      setMounted(false);
      setTimeout(() => {
        handler();
      }, 320);
    };

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    };

    useImperativeHandle(ref, () => ({
      closeDialog: () => {
        hideDialog(null);
      },
    }));

    return (
      <>
        {open && (
          <Portal>
            <div className="fixed flex inset-0" onClick={hideDialog}>
              <div
                className={`fixed inset-0 bg-gray-800 transition-opacity duration-300 ${
                  mounted ? "bg-opacity-75" : "bg-opacity-0"
                }`}
              >
                <div className="grid-cols-[10px_minmax(300px,_100%)_10px] md:grid-cols-[60px_minmax(300px,_100%)_60px] grid h-full w-full grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] md:grid-rows-[minmax(20px,_1fr)_auto_minmax(20px,_1fr)] overflow-y-auto">
                  <div
                    onClick={stopPropagation}
                    role="dialog"
                    className={`relative col-auto col-start-2 row-auto row-start-2 w-full  text-left shadow-2xl transition-all left-1/2 -translate-x-1/2 max-w-max flex items-center justify-center duration-300  ${
                      mounted ? "scale-100" : "scale-0"
                    }`}
                    tabIndex={-1}
                  >
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </Portal>
        )}
      </>
    );
  }
);
Dialog.displayName = "Dialog";
export default Dialog;
