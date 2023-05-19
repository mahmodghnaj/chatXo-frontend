import CurrentChat from "@/components/current-chat";
import Main from "@/components/layouts/main";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <CurrentChat />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
export default Home;
