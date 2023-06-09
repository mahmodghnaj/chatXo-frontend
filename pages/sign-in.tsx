import { ReactElement, useEffect } from "react";
import type { NextPageWithLayout } from "./_app";
import AuthLayout from "@/components/layouts/auth-layout";
import FormSignIn from "@/components/form-sign-in";
import { useRouter } from "next/router";
import Head from "next/head";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.reload) {
      window.location.href = "/sign-in";
    }
  }, []);
  return (
    <>
      <Head>
        <title>ChatXo</title>
      </Head>
      <FormSignIn />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Page;
