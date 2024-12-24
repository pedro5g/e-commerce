"use client";

import Link from "next/link";
import { Button } from "../components/Button";
import { Input } from "../components/inputs/Input";
import { BsGoogle } from "react-icons/bs";
import { Heading } from "../components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@/@types/user-type";

interface LoginFormProps {
  currentUser: User | null | undefined;
}

export const LoginForm = ({ currentUser }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callBack) => {
      setIsLoading(false);
      if (callBack?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged In");
      }

      if (callBack?.error) {
        toast.error(callBack.error);
      }
    });
  };

  if (currentUser) {
    return <p className=" text-center">Logged In. Redirecting...</p>;
  }

  return (
    <>
      <Heading center title="Sing in to E-Commerce" />
      <div className=" w-full">
        <Button
          onClick={() => {
            signIn("google");
          }}
          outline
          icon={<BsGoogle />}
          label="Sing up with Google"
        />
      </div>
      <hr className="w-full my-2" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr className="w-full my-2" />
      <div className=" w-full">
        <Button
          label={isLoading ? "Loading" : "Sing up"}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
      <div className=" flex gap-2 text-zinc-800 py-3 ">
        <p>Do not have an account?</p>
        <span className="underline font-semibold">
          <Link href={"/register"}>Sing Up</Link>
        </span>
      </div>
    </>
  );
};
