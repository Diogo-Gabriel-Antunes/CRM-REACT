import axios, { Axios } from "axios";
import API from ".";
import { useState } from "react";

export default function IsAuthenticate() {
  var token = localStorage.getItem("Token");
  const [autenticado, setAutenticado] = useState(true);
  if (token) {
    axios
      .get(`http://localhost:8080/login`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setAutenticado(true);
      })
      .catch((response) => {
        console.log(response);

        setAutenticado(false);
      });
  } else {
    setAutenticado(false);
  }

  return autenticado;
}
