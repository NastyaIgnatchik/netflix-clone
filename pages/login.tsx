import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import people from "../public/people.jpg";
import logo from "../public/netflix.png";
import { useForm } from "react-hook-form";
import UseAuth from "../hooks/UseAuth";
import { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const { signIn, signUp, isLoading } = UseAuth();
  const [login, setLogin] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const onSubmitForm = (data) => {
    if (login) {
      signIn(data.email, data.password);
    } else {
      signUp(data.email, data.password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent ">
      <Toaster position="top-center" />
      <Head>
        <title>Netflix-Login</title>
      </Head>

      <Image
        alt="banner"
        src={people}
        layout="fill"
        objectFit="cover"
        className="-z-10 hidden opacity-60 sm:inline"
      />
      <Image
        src={logo}
        alt="logo"
        width={100}
        height={100}
        className="absolute left-4 top-4 md:left-10 md:top-6 cursor-pointer object-contain"
      />
      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <h1 className="text-4xl text-semibold ">Sign in</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="font-light text-orange-500">
                This field is required
              </span>
            )}
          </label>
          <label className="inline-block w-full ">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="font-light text-orange-500">
                This field is required
              </span>
            )}
          </label>
        </div>
        <button
          className="w-full py-4 font-semibold bg-[#e50914] rounded"
          type="submit"
          onClick={() => setLogin(true)}
        >
          {isLoading ? <CircularProgress sx={{ color: "gray" }} /> : "Sign in"}
        </button>
        <div className=" text-[gray]">
          Not login yet?
          <button
            className="text-white hover:underline"
            type="submit"
            onClick={() => setLogin(false)}
          >
            &nbsp;Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
