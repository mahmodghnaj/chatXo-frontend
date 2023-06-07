import { useRouter } from "next/router";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutation } from "@/store/service/auth";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
const signUpSchema = object({
  firstName: string().min(1, "Required"),
  lastName: string().min(1, "Required"),
  email: string().min(1, "Required").email("Email Address is invalid"),
  password: string()
    .min(1, "Required")
    .min(6, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password don't match",
});
export type signUpInput = TypeOf<typeof signUpSchema>;
const FormSignUp = () => {
  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmitHandler: SubmitHandler<signUpInput> = (values) => {
    const { confirmPassword, ...res } = values;
    signUp(res);
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
      <div className="bg-base-200  w-auto sm:w-96 rounded-3xl p-8 z-20">
        <div className="flex justify-between items-center">
          <p className="font-thin ">Welcome to chat App</p>
          <p className=" font-serif text-xs">
            Have an Account ?<br />
            <span
              className="text-success cursor-pointer text-bold"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </span>
          </p>
        </div>
        <div>
          <h1 className="text-4xl font-bold">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mt-5 space-y-2">
            <p className="text-sm font-extralight">Enter Email address</p>
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
            <div className="flex space-x-2">
              <div className="space-y-2">
                <p className="text-sm font-extralight ">First Name</p>
                <div>
                  <input
                    type="text"
                    {...register("firstName")}
                    placeholder="First Name"
                    className="input input-primary w-full  input-md"
                  />
                  <p className="mt-1 text-error font-semibold  text-sm">
                    {errors.firstName?.message}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-extralight">Last Name</p>
                <div>
                  <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="input input-primary w-full  input-md"
                  />
                  <p className="mt-1 text-error font-semibold  text-sm">
                    {errors.lastName?.message}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm font-extralight">Enter your Password</p>
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="input input-primary w-full input-md"
              />
              <p className="mt-1 text-error font-semibold  text-sm">
                {errors.password?.message}
              </p>
            </div>
            <p className="text-sm font-extralight">
              Enter your Confirm Password
            </p>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="input input-primary w-full input-md"
              />
              <p className="mt-1 text-error font-semibold  text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className={`mt-5 btn btn-primary w-full ${isLoading && "loading"}`}
          >
            Sign Up
          </button>
        </form>
        <div className="my-5 flex justify-center">OR</div>
        <div className="flex flex-nowrap space-x-2 items-center justify-center">
          <button
            onClick={() => loginSocial("google")}
            className="btn btn-sm gap-2  btn-secondary capitalize"
          >
            <FcGoogle size="20px" />
            Sign up with Google
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

export default FormSignUp;
