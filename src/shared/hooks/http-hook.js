import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
export const useHttpClient = () => {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const [response, setResponse] = useState(null)
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const sendRequest = useCallback(async (url, body) => {
    await axios
      .post(url, body, options)
      .then((res) => {
        console.log(res.data, "SUCCESSFUL");
        return res.data;
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);
  return { error, sendRequest, errors, response };
};
