"use client";

import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import Router from "next/navigation";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import ToggleInputType from "@/components/ToggleInputType";

const Signup = () => {
  const [textOnBtn, setTextOnBtn] = useState("Register");
  const [inputType, setInputType] = useState("password");
  const [inputTypeConfirmPass, setInputTypeConfirmPass] = useState("password");
  const handleShowHidePassword = (e) => {
    if (inputType === "text") setInputType("password");
    else setInputType("text");
  };
  const handleShowHideConfirmPass = () => {
    if (inputTypeConfirmPass === "text") setInputTypeConfirmPass("password");
    else setInputTypeConfirmPass("text");
  };

  useEffect(() => {
    if (loggedIn) Router.push("/");
  });

  let { loggedIn, setLoggedIn, serverURL } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const password = watch("password");
  const onSubmit = async (formData) => {
    setTextOnBtn("Submitting...");
    delete formData.cpassword;
    const request = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    let result;
    try {
      const response = await toast.promise(
        fetch(`${serverURL}/user`, request),
        {
          pending: "Please wait!",
          error: "Please Retry",
        }
      );
      const { message } = await response.json();
      if (response.status === 200) {
        toast.success("Account opened Successfully");
        Router.push("/Login");
        toast.success("Please Login to continue..");
      } else if (response.status === 400) {
        toast.error(message);
      }
    } catch (err) {
      setTextOnBtn("Register");
    }
    setTextOnBtn("Register");
  };
  if (!loggedIn) {
    return (
      <>
        <Head>
          <title>Engineer&apos;s Way| signup </title>
        </Head>
        <div className="dark:bg-black-bg  h-screen flex justify-center items-center md:flex">
          {/* card */}
          <div className="mx-2 md:mx-4 flex bg-white-1 dark:bg-black-bg1 shadow-2xl flex-col md:flex-row items-center max-w-screen-lg overflow-hidden rounded-3xl  bg-white w-full md:flex ">
            <div className="w-5/6  h-full my-0  md:w-full  sm:w-full sm:h-full ">
              <img src="/images/signup full color.png" alt="signup"></img>
            </div>
            {/* form */}
            <div className="bg-white flex flex-col items-center p-4 space-y-8 w-full h-full md:mr-0 form-1">
              {/* welcome */}
              <div className="flex flex-col items-center">
                <h2 className="font-Mont font-bold text-2xl md:text-4xl text-purple-500 ">
                  Get Started
                </h2>
                <p className="font-Mont text-gray-600 dark:text-slate-50 font-bold">
                  Create an Account
                </p>
              </div>
              {/* input */}
              <form
                className="flex flex-col items-center space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="relative">
                  <div className=""></div>
                  <input
                    className="input-border font-Mont ip-place-holder"
                    placeholder="Full Name"
                    type="text"
                    {...register("name", { required: true })}
                  />
                  {errors.name && errors.name.type == "required" && (
                    <p className="  font-Mont text-red-700 font-medium">
                      please enter your name
                    </p>
                  )}
                </div>
                <div className="relative">
                  <div className=""></div>

                  <input
                    className="input-border font-Mont ip-place-holder"
                    placeholder="Create Username"
                    type="text"
                    {...register("username", { required: true })}
                  />
                  {errors.username && errors.username.type == "required" && (
                    <p className="  font-Mont text-red-700 font-medium">
                      please enter your username
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    className="input-border font-Mont ip-place-holder"
                    placeholder="Email"
                    type="text"
                    {...register("email", { required: true })}
                  />
                  {errors.email && errors.email.type == "required" && (
                    <p className=" font-Mont text-red-700 font-medium">
                      please enter your email id
                    </p>
                  )}
                </div>
                <div className="relative">
                  <input
                    className="input-border font-Mont ip-place-holder"
                    placeholder="Password"
                    type={inputType}
                    {...register("password", { required: true, minLength: 5 })}
                  />
                  <ToggleInputType
                    type={inputType}
                    onclick={handleShowHidePassword}
                    classStyle="absolute left-[90%] top-[10px]"
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p className=" font-Mont text-red-700 font-medium">
                      please enter your password
                    </p>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <p className=" font-Mont text-red-700 font-medium">
                      please enter atleast 5 characters
                    </p>
                  )}
                </div>
                <div className="relative">
                  <input
                    className="input-border font-Mont ip-place-holder"
                    placeholder="Confirm password"
                    type={inputTypeConfirmPass}
                    {...register("cpassword", {
                      required: true,
                      minLength: 3,
                      validate: (value) => {
                        console.log(errors);
                        return value === password || "Passwords do not match";
                      },
                    })}
                  />
                  <ToggleInputType
                    type={inputTypeConfirmPass}
                    onclick={handleShowHideConfirmPass}
                    classStyle="absolute left-[90%] top-[10px]"
                  />

                  {errors.cpassword && errors.cpassword.type === "required" && (
                    <p className=" font-Mont text-red-700 font-medium">
                      please confirm your password
                    </p>
                  )}
                  {errors.cpassword && errors.cpassword.type === "validate" && (
                    <p className=" font-Mont text-red-700 font-medium">
                      {errors.cpassword.message}
                    </p>
                  )}
                </div>
                <div className="vBtn justify-center inline-block items-center dark:bg-transparent dark:border-2 border-purple-600 dark:hover:bg-fuchsia-600/20 transition transform">
                  {" "}
                  <button className="w-full font-Mont" type="submit">
                    {textOnBtn}
                  </button>{" "}
                </div>
              </form>
              {/* Links */}
              <div className="flex flex-col items-center">
                <p className="italic text-black font-Mont dark:text-slate-50">
                  Already an User
                  <Link href="/login">
                    <button className="ml-1 text-pink-600 hover:underline font-Mont">
                      login
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <>redirecting...</>;
  }
};

export default Signup;
