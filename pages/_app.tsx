import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import type { AppContext, AppProps } from "next/app";
import "@/styles/globals.css";
import useLocalStorage from "@/utilities/common/hooks/use-local-storage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import Cookies from "cookies";
import { setRefreshToken } from "@/store/features/auth";
import { ProvideSocketIoClient } from "@/utilities/common/hooks/use-socket-io";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  refreshToken?: string;
};
const App = ({ Component, pageProps, ...res }: AppPropsWithLayout) => {
  // Set Theme
  const [myTheme] = useLocalStorage<string>("theme", "light");
  useEffect(() => {
    document.body.setAttribute("data-theme", myTheme);
  }, []);
  //
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
      <Provider store={store}>
        <ProvideSocketIoClient> {withLayout} </ProvideSocketIoClient>
      </Provider>
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
