import { ReactElement, useEffect } from "react";
import type { NextPageWithLayout } from "./_app";
import AuthLayout from "@/components/layouts/auth-layout";
import FormSignIn from "@/components/form-sign-in";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.reload) {
      window.location.href = "/sign-in";
    }
  }, []);
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
