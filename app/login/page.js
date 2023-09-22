"use client";

import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";

import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import { AppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import ToggleInputType from "@/components/ToggleInputType";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please Enter Username"),
  password: Yup.string().required("Please Enter Password"),
});
let isSubmitClicked = false;
let alreadyValidated = true;

const Login = () => {
  const router = useRouter();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState([null, null]); //setting this as an empty array initially
  const [textOnBtn, setTextOnBtn] = useState("Login");
  const [inputType, setInputType] = useState("password");

  let { history, loading, loggedIn, setLoggedIn, serverURL } =
    useContext(AppContext);
  const handleShowHidePassword = (e) => {
    if (inputType === "text") setInputType("password");
    else setInputType("text");
  };

  async function validateForm(data) {
    if (!isSubmitClicked) return;

    let formErrors = [null, null];
    let isValid = false;
    try {
      const validData = await validationSchema.validate(data, {
        abortEarly: false,
      });
      isValid = true;
    } catch (err) {
      console.log(err.inner);
      err.inner.forEach((e) => {
        if (e.message.match(/username/i)) {
          formErrors[0] = e.message;
        } else {
          formErrors[1] = e.message;
        }
      });
    }
    setErrors(formErrors);
    alreadyValidated = true;
    return isValid;
  }

  async function handleSubmit() {
    isSubmitClicked = true;
    let isValid = await validateForm({ username, password });
    console.log(username, password);
    if (!isValid) {
      isSubmitClicked = false;
      return;
    }
    const request = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    let result;
    try {
      setTextOnBtn("Submitting...");
      const response = await toast.promise(
        fetch(`${serverURL}/auth`, request),
        {
          pending: "Validating Username and Password",
        }
      );
      console.log("response", result);
      result = await response.json();
      if (response.status === 200) {
        console.log(result);
        document.cookie = `authToken=${result.token};max-age=60*60*24*7;`;
        localStorage.setItem("authStatus", "1");
        setLoggedIn(true);
        toast.success("Login successful!");
        //Router.push("/");
      } else if (response.status === 400) {
        toast.error("Invalid username or password!");
        setTextOnBtn("Login");
      }
    } catch (err) {
      setTextOnBtn("Login");
      console.log(err);
    }
    isSubmitClicked = false;
  }
  async function handleChange(callback, callbackArg) {
    callback(callbackArg);
    alreadyValidated = false;
  }
  useEffect(() => {
    if (!loading) {
      console.log(history);
      if (loggedIn) {
        const redirectTo = history[1] === router.pathname ? "/" : history[1];
        console.log(history);
        router.push(redirectTo);
      }
      if (alreadyValidated) return;
      validateForm({ username, password });
    }
  }, [loading, loggedIn]);
  //console.log(context.loggedIn);
  if (!loggedIn) {
    return (
      // container
      <>
        <Head>
          <title>Engineer&apos;s Way | login </title>
        </Head>
        <div className="dark:bg-black-bg h-full sm:h-screen  flex justify-center items-center md:flex">
          {/* card */}
          <div className="relative bg-white-1 rounded-2xl dark:bg-black-bg1  ">
            <div className=" mx-2  flex flex-col md:flex-row items-center max-w-screen-lg overflow-hidden rounded-3xl shadow-xl  w-full md:flex ">
              <div className="w-5/6 h-1/3 sm:w-3/4  md:w-full md:h-full   ">
                <img src="/images/login.png" alt="Login Image"></img>
              </div>
              {/* form */}
              <div className=" flex flex-col items-center p-4 space-y-8 w-full md:mr-0">
                {/* welcome */}
                <div className="flex flex-col items-center form-1">
                  <h1 className="font-Mont font-bold text-2xl md:text-4xl text-purple-500">
                    Welcome Back
                  </h1>
                  <p className="font-Mont  text-gray-600 dark:text-slate-50 font-bold">
                    Login to Your Account
                  </p>
                </div>
                {/* input */}
                <form className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <input
                      onChange={(e) =>
                        handleChange(setUsername, e.target.value, password)
                      }
                      className="input-border font-Mont"
                      placeholder="username"
                      type="text"
                    />
                    {errors[0] ? (
                      <p className=" text-red-700 font-medium">{errors[0]}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="relative">
                    <input
                      onChange={(e) =>
                        handleChange(setPassword, e.target.value, username)
                      }
                      className="input-border font-Mont"
                      placeholder="password"
                      type={inputType}
                    />
                    <ToggleInputType
                      type={inputType}
                      onclick={handleShowHidePassword}
                      classStyle="absolute left-[90%] top-[10px]"
                    />
                    {errors[1] ? (
                      <p className=" text-red-700 font-medium">{errors[1]}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="p-2 text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl border-none shadow-lg w-full flex justify-center items-center font-bold
                  dark:shadow-3xl dark:hover:shadow-orange-500/10 dark:shadow-orange-500/30"
                  >
                    {" "}
                    <button
                      className="w-full font-Mont"
                      type="button"
                      // disabled={isSubmitClicked}
                      onClick={() => handleSubmit()}
                    >
                      {textOnBtn}
                    </button>
                  </div>
                  {/*<span>OR</span>
                  <ContinueWithGoogleButton />*/}
                </form>

                {/* Links */}
                <div className="flex flex-col items-center">
                  <p className="font-Mont italic text-black dark:text-slate-50">
                    Don&apos;t have an account?
                    <Link href="/signup">
                      <div>
                        <button className="ml-1 z-20 text-pink-600 hover:underline cursor-pointer">
                          Register
                        </button>
                      </div>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>Redirecting...</>;
};

export default Login;
