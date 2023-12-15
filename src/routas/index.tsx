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
import CampanhaHome from "../cliente/campanha";
import AgendaFunilHome from "../agenda/funil";
import AgendaConfiguracoesHome from "../agenda/configuracoes";
import DragDropHome from "../dragDrop";
import ProdutoCadastrarHome from "../produtos/cadastrar";
import MateriaPrimaCadastrarHome from "../produtos/MateriaPrima";
import EmailCadastrarHome from "../email/cadastrar";
import ConfiguracoesEmailHome from "../email/configuracoes";
import EnviarEmailHome from "../email/enviarEmail";
import PromocaoCadastrarHome from "../produtos/promocao";
import PedidoHome from "../pedido";

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
            />{" "}
            <Route
              path="cliente/campanha"
              element={
                IsAuthenticate() ? <CampanhaHome /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="agenda/visualizar"
              element={
                IsAuthenticate() ? <AgendaFunilHome /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="agenda/configuracao"
              element={
                IsAuthenticate() ? (
                  <AgendaConfiguracoesHome />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="drag-drop/visualizar"
              element={
                IsAuthenticate() ? <DragDropHome /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="produto/cadastrar"
              element={
                IsAuthenticate() ? (
                  <ProdutoCadastrarHome />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="produto/materia-prima"
              element={
                IsAuthenticate() ? (
                  <MateriaPrimaCadastrarHome />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />{" "}
            <Route
              path="produto/promocao"
              element={
                IsAuthenticate() ? (
                  <PromocaoCadastrarHome />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />{" "}
            <Route
              path="email/cadastrar"
              element={
                IsAuthenticate() ? (
                  <EmailCadastrarHome />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="email/configuracoes"
              element={
                IsAuthenticate() ? (
                  <ConfiguracoesEmailHome />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="email/enviar-email"
              element={
                IsAuthenticate() ? <EnviarEmailHome /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="pedido/visualizar"
              element={
                IsAuthenticate() ? <PedidoHome /> : <Navigate to={"/"} />
              }
            />
          </Routes>
        </MenuBar>
      </ClienteContextProvider>
    </BrowserRouter>
  );
}
