import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import AuthLayout from "@/components/layouts/auth-layout";
import FormSignIn from "@/components/form-sign-in";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <FormSignIn />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Page;
