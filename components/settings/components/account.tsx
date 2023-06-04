import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { profile } from "@/store/features/profile";
import { useUpdateProfileMutation } from "@/store/service/profile";
import LoadingSpinner from "@/components/loading-spinner";

const schema = z.object({
  firstName: z.string().nonempty({ message: "First Name is required" }),
  lastName: z.string().nonempty({ message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid Email" }),
});

type FormData = z.infer<typeof schema>;

const Account: React.FC = () => {
  const info = useSelector(profile);
  const [updateProfile, { isLoading: isUpdating, isSuccess }] =
    useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: info?.firstName,
      lastName: info?.lastName,
      email: info?.email,
    },
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (info) {
      setValue("firstName", info?.firstName);
      setValue("lastName", info?.lastName);
      setValue("email", info?.email);
    }
  }, [info, setValue]);
  const onSubmit = (data: FormData) => {
    if (
      data.firstName === info?.firstName &&
      data?.lastName === info?.lastName &&
      data.email === info?.email
    ) {
      // No changes in inputs, return early
      return;
    }
    updateProfile(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col w-full max-w-xl mx-auto"
      >
        <div className="md:flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-md font-extralight my-2">
              Enter Your First Name
            </p>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              {...register("firstName")}
              className={`input input-md input-primary`}
            />
            {errors.firstName && (
              <span className="text-error">{errors.firstName.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-md font-extralight my-2">Enter Your Last Name</p>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              {...register("lastName")}
              className={`input input-primary input-md`}
            />
            {errors.lastName && (
              <span className="text-error">{errors.lastName.message}</span>
            )}
          </div>
        </div>
        {!info?.socialId && (
          <div className="flex flex-col">
            <p className="text-md font-extralight my-2">Enter Your Email</p>

            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              className={`input input-primary input-md w-full`}
            />
            {errors.email && (
              <span className="text-error">{errors.email.message}</span>
            )}
          </div>
        )}
        <button
          type="submit"
          className={`btn btn-primary capitalize ${isUpdating && "loading"}`}
        >
          Change Info
        </button>
      </form>
    </>
  );
};

export default Account;
