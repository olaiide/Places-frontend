import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/hooks/http-hook";
const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [error, setError] = useState("");
  const { getRequest, errors, response } = useHttpClient();
  useEffect(() => {
   getUsers();
  
  }, []);
  const getUsers = async () => {
    await axios
      .get("http://localhost:5000/api/users/")
      .then((res) => {
        setLoadedUsers(res.data.users);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  
  };
  return <>{loadedUsers && <UsersList items={loadedUsers} />}</>;
};

export default Users;
