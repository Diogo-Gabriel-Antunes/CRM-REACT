import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../login";
import HomePage from "../Home";
import MenuBar from "../components/menubar";
import ClienteHome from "../cliente";
import ClienteContextProvider from "../context/clienteContext";
import FunilHome from "../cliente/funil";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ClienteContextProvider>
        <MenuBar>
          <Routes>
            <Route element={<LoginPage />} path="login" />
            <Route element={<HomePage />} path="home" />
            <Route element={<ClienteHome />} path="cliente/cadastro" />
            <Route element={<FunilHome />} path="cliente/funil" />
          </Routes>
        </MenuBar>
      </ClienteContextProvider>
    </BrowserRouter>
  );
}
