import Cookies from "js-cookie";
import React, { useContext, createContext, useRef } from "react";
import SocketIoClient from "../socketIo-client";

interface SocketIoContextValue {
  socketIoClient: SocketIoClient | null;
}

const socketIoContext = createContext<SocketIoContextValue>({
  socketIoClient: null,
});

interface Props {
  children: React.ReactNode;
}

export function ProvideSocketIoClient({ children }: Props) {
  const client = useProvideSocketIoClient();
  return (
    <socketIoContext.Provider value={{ socketIoClient: client }}>
      {children}
    </socketIoContext.Provider>
  );
}

export function useSocketIoClient() {
  const context = useContext(socketIoContext);
  if (context.socketIoClient === null) {
    throw new Error(
      "useSocketIoClient must be used within a ProvideSocketIoClient"
    );
  }
  return context.socketIoClient;
}

function useProvideSocketIoClient() {
  const config = {
    url: process.env.NEXT_PUBLIC_BASE_URL?.toString().replace("api/", ""),
    token: Cookies.get("accessToken"),
  };
  const clientRef = useRef<SocketIoClient | null>(null);
  if (!clientRef.current) {
    clientRef.current = new SocketIoClient(config);
    clientRef.current.on("connect", () => {
      console.log("Socket.io client connected");
    });
    clientRef.current.on("disconnect", () => {
      console.log("Socket.io client disconnected");
    });
  }
  return clientRef.current;
}
