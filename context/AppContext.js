"use client";
import { useRouter } from "next/navigation";
import { useState, createContext, useEffect } from "react";
import { useTheme } from "next-themes";

export const AppContext = createContext();
export const isMaintenanceMode = false;

function AppContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  // const serverURL = "http://192.168.0.102:3001";
  const router = useRouter();
  //const serverURL = "https://engineersway.herokuapp.com";
  const serverURL = "";
  const [loading, setLoading] = useState(true);

  //history[0]->current path  || history[1] -> previous path
  const [history, setHistory] = useState([router.pathname, "/"]);
  const [isLoginCountDownComplete, setLoginCountDownComplete] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [gltfInfo, setGltfInfo] = useState({});
  useEffect(() => {
    //setting the theme dark by default
    setTheme("dark");
    const cookies = document.cookie.split("; ");
    setHistory([router.pathname, history[0]]);
    let authStatus = localStorage.getItem("authStatus");
    if (authStatus && authStatus == "1") {
      setLoggedIn(true);
      console.log("logged in");
    }
    setLoading(false);
  }, [router]);
  useEffect(() => {
    if (isMaintenanceMode) router.push("/");
  }, [router.pathname]);
  return (
    <AppContext.Provider
      value={{
        history,
        loading,
        loggedIn,
        setLoggedIn,
        serverURL,
        isLoginCountDownComplete,
        setLoginCountDownComplete,
        gltfInfo,
        setGltfInfo,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
