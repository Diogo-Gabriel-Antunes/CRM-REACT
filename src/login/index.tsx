"use client";
import React from "react";
import {
  Box,
  Button,
  Center,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitInterface } from "../provider";
import API from "../API";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function login() {
    let submitDTO: SubmitInterface = {
      url: "/login",
      body: { email: email, senha: senha },
    };

    API.post("/login", submitDTO.body)
      .then((response) => {
        localStorage.setItem("Token", response.data.token);
        navigate("/home");
      })
      .catch((response) => {
        console.log(response);
      });
  }

  return (
    <Box>
      <Box>
        <Box></Box>
        <Box w={"full"} display={"flex"} height={"full"}>
          <Box mx={"auto"} my="auto" mt={"300px"}>
            <Box display={"flex"} alignItems={"center"} mx={"auto"} my={"auto"}>
              <Box width={400} display={"flex"} flexDir={"column"}>
                <Box>
                  <Heading textAlign={"center"}>CRM</Heading>
                </Box>
                <Center
                  gap={10}
                  display={"flex"}
                  flexDir={"column"}
                  border={"1px"}
                  borderColor={"gray.300"}
                  padding={"35px"}
                  borderRadius={"16px"}
                >
                  <Box>
                    <FormLabel>E-mail</FormLabel>
                    <Input
                      placeholder="E-mail"
                      _placeholder={{ opacity: 1, color: "gray.500" }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Senha</FormLabel>
                    <Input
                      placeholder="senha"
                      _placeholder={{ opacity: 1, color: "gray.500" }}
                      type="password"
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <Button
                      colorScheme="green"
                      w="full"
                      onClick={() => {
                        login();
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                </Center>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
