"use client";

import { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { Input } from "../components/inputs/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "../components/Button";

import { BsGoogle } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "@/@types/user-type";

interface RegisterFormProps {
  currentUser: User | null | undefined;
}

export const RegisterForm = ({ currentUser }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success, your account was create!");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callBack) => {
          if (callBack?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged In");
          }

          if (callBack?.error) {
            toast.error(callBack.error);
          }
        });
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return <p className=" text-center">Logged In. Redirecting...</p>;
  }

  return (
    <>
      <Heading center title="Sing up for E-Commerce" />
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
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        <p>Already have an account?</p>
        <span className="underline font-semibold">
          <Link href={"/login"}>Log In</Link>
        </span>
      </div>
    </>
  );
};
