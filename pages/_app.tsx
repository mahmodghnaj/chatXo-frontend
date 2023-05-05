import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import useLocalStorage from "@/utilities/common/hooks/use-local-storage";
import { wrapper } from "../store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let login = 1;
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const App = function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Set Theme
  const [myTheme] = useLocalStorage<string>("theme", "light");
  useEffect(() => {
    document.body.setAttribute("data-theme", myTheme);
  }, [myTheme]);
  //
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
};
App.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
  login = login + 1;
  return {
    pageProps: {
      login,
    },
  };
});

export default wrapper.withRedux(App);
