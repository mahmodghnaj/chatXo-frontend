import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppContext, AppProps } from "next/app";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import Cookies from "cookies";
import { setRefreshToken } from "@/store/features/auth";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  refreshToken?: string;
};
const App = ({ Component, pageProps, ...res }: AppPropsWithLayout) => {
  if (res.refreshToken) {
    store.dispatch(setRefreshToken(res.refreshToken));
  }
  const getLayout = Component.getLayout ?? ((page) => page);
  const withLayout = getLayout(
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
  return (
    <>
      <Provider store={store}>{withLayout}</Provider>
    </>
  );
};
App.getInitialProps = async ({ ctx }: AppContext) => {
  if (ctx.req && ctx.res) {
    const cookie = new Cookies(ctx.req, ctx.res);
    const refreshToken = cookie.get("refreshToken");
    return {
      refreshToken,
    };
  }
  return {};
};

export default App;
