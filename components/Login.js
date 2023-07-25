import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext, useRef } from "react";
import * as Yup from "yup";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import ToggleInputType from "./ToggleInputType";
import ContinueWithGoogleButton from "./ContinueWithGoogleButton";

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
  const redirectURL = useRef();
  if (typeof window !== "undefined") redirectURL.current = window.location.href;

  let {
    history,
    loading,
    loggedIn,
    setLoggedIn,
    serverURL,
    setLoginCountDownComplete,
  } = useContext(AppContext);
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
        setLoginCountDownComplete(false);
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
        <div className=" backdrop-blur transition-3 fixed w-screen h-screen sm:h-screen sm:w-screen z-[10000]  flex justify-center items-center md:flex">
          {/* card */}
          <div className="relative   ">
            <div className=" mx-2 bg-white my-4 flex flex-col md:flex-row items-center max-w-screen-lg overflow-hidden rounded-3xl shadow-lg  w-full md:flex ">
              {/* form */}
              <div className=" flex flex-col items-center p-4 space-y-8 w-full h-96 md:mr-0">
                {/* welcome */}
                <div className="flex flex-col items-center">
                  <h1 className="font-bold text-2xl md:text-4xl text-purple-500">
                    Enjoying ?
                  </h1>
                  <p className="text-gray-600 font-bold">
                    Please Login and keep watching
                  </p>
                </div>
                {/* input */}
                <form className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <input
                      onChange={(e) =>
                        handleChange(setUsername, e.target.value, password)
                      }
                      className="input-border"
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
                      className="input-border"
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
                  <div className="p-2 text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl border-none shadow-lg w-full flex justify-center items-center font-bold">
                    {" "}
                    <button
                      className="w-full"
                      type="button"
                      // disabled={isSubmitClicked}
                      onClick={() => handleSubmit()}
                    >
                      {textOnBtn}
                    </button>
                  </div>
                  <span>OR</span>
                  <ContinueWithGoogleButton redirectURL={redirectURL.current} />
                </form>
                {/* <GoogleLogin /> */}
                {/* Links */}
                {/* <div className="flex flex-col items-center">
                  <p className="italic text-black">
                    Don&apos;t have an account?
                    <Link href="/Signup">
                      <div>
                        <a className="ml-1 z-20 text-pink-600 hover:underline cursor-pointer">
                          Register
                        </a>
                      </div>
                    </Link>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Login;
