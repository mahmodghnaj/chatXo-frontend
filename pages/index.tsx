import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ login }: any) {
  const router = useRouter();
  return (
    <main className="bg-primary">
      {login}
      <br />
      <button onClick={() => router.push("/sign-up")}> Sign up</button>
      <br />
      <button onClick={() => router.push("/sign-in")}> Sign in</button>
    </main>
  );
}
