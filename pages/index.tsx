import { useRouter } from "next/router";
export default function Home({}: any) {
  const router = useRouter();
  return (
    <main className="bg-primary">
      <br />
      <button onClick={() => router.push("/sign-up")}> Sign up</button>
      <br />
      <button onClick={() => router.push("/sign-in")}> Sign in</button>
    </main>
  );
}
