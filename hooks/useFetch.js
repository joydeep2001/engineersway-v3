import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url, options = { method: "GET" }, payload) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    axios(url, payload, options)
      .then((response) => setData(response.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    data,
    error,
  };
}
