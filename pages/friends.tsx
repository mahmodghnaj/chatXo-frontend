import Main from "@/components/layouts/main";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Friends: NextPageWithLayout = () => {
  return (
    <>
      <div>Hello</div>
    </>
  );
};

Friends.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
export default Friends;
