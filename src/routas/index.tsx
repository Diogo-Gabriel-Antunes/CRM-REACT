/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import LoginPage from "../login";
import HomePage from "../Home";
import MenuBar from "../components/menubar";
import ClienteHome from "../cliente";
import ClienteContextProvider from "../context/clienteContext";
import FunilHome from "../cliente/funil";
import IsAuthenticate from "../API/Autenticacao";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ClienteContextProvider>
        <MenuBar>
          <Routes>
            <Route element={<LoginPage />} path="/" />
            <Route
              path="home"
              element={IsAuthenticate() ? <HomePage /> : <Navigate to={"/"} />}
            />

            <Route
              path="cliente/cadastro"
              element={
                IsAuthenticate() ? <ClienteHome /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="cliente/funil"
              element={IsAuthenticate() ? <FunilHome /> : <Navigate to={"/"} />}
            />
          </Routes>
        </MenuBar>
      </ClienteContextProvider>
    </BrowserRouter>
  );
}
