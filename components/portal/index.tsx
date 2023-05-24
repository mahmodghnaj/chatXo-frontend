import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (typeof window === "undefined" || !mounted) {
    return null;
  }

  const portalContainer = document.body;

  if (portalContainer) {
    return ReactDOM.createPortal(children, portalContainer);
  }

  return null;
};

export default Portal;
