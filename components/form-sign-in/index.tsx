import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineGithub } from "react-icons/ai";
// validate
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInMutation } from "@/store/service/auth";
import { useEffect } from "react";
const signInSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(6, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SignInInput = TypeOf<typeof signInSchema>;
const FormSignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });
  const [signIn, { isLoading, isSuccess }] = useSignInMutation();

  const onSubmitHandler: SubmitHandler<SignInInput> = (values) => {
    signIn(values);
  };
  useEffect(() => {
    if (isSuccess) router.push("/");
  }, [isSuccess, router]);
  const loginSocial = (type: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}auth/${type}`;
    window.location.href = url;
  };
  return (
    <>
      <div className="bg-base-200 w-auto sm:w-96  rounded-3xl p-8 z-20">
        <div className="flex justify-between items-center">
          <p className="font-thin ">Welcome to chat App</p>
          <p className=" font-serif text-xs">
            No Account ?<br />
            <span
              className="text-success cursor-pointer text-bold"
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </span>
          </p>
        </div>
        <div>
          <h1 className="text-4xl font-bold ">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mt-5 space-y-3">
            <p className="text-sm font-extralight">Enter your Email address</p>
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email Address"
                className="input input-primary w-full  input-md"
              />
              <p className="mt-1 text-error font-semibold  text-sm">
                {errors.email?.message}
              </p>
            </div>
            <p className="text-sm font-extralight">Enter your Password</p>
            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="input input-primary w-full input-md"
              />
              <p className="mt-1 text-error font-semibold  text-sm">
                {errors.password?.message}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className={`mt-6 btn btn-primary w-full ${isLoading && "loading"}`}
          >
            Sign In
          </button>
        </form>
        <div className="my-5 flex justify-center">OR</div>
        <div className="flex flex-nowrap space-x-2 items-center justify-center">
          <button
            onClick={() => loginSocial("google")}
            className="btn btn-sm gap-2  btn-secondary capitalize"
          >
            <FcGoogle size="20px" />
            Sign in with Google
          </button>

          <button
            onClick={() => loginSocial("github")}
            className="btn btn-square btn-sm"
          >
            <AiOutlineGithub size="20px" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FormSignIn;
