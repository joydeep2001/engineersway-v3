import React, { useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";
import { useRouter } from "next/router";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { loggedIn, loading } = useContext(AppContext);

  useEffect(() => {
    if (!loading && !loggedIn) {
      router.push("/Login");
    }
  }, [loading]);

  return <>{loggedIn ? children : null}</>;
}
