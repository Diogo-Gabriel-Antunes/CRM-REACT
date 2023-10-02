"use client";
import { useToast } from "@chakra-ui/react";
import React from "react";
import API from "../API";

export const SubmitContext = React.createContext<ContextProps>({
  submit: () => {},
});

interface ContextProps {
  submit: ({ url, body, id }: SubmitInterface) => void;
}

interface Props {
  children: React.ReactNode;
}

export interface SubmitInterface {
  url: string;
  body: any;
  id?: string;
}

export default function SubmitContextProvider({ children }: Props) {
  const Toast = useToast();

  const submit = ({ url, body, id }: SubmitInterface) => {
    if (id) {
      API.put(url + id, body)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            Toast({
              position: "top-right",
              colorScheme: "green",
              title: "Requizição realizada com sucesso",
              description: "Ok!",
            });
          } else {
            Toast({
              position: "top-right",
              colorScheme: "red",
              title: "Erro na requisição verifique as informações",
              description: "Erro!",
            });
          }
        })
        .catch((response) => {
          Toast({
            position: "top-right",
            colorScheme: "red",
            title: "Erro na requisição verifique as informações",
          });
        });
    } else {
      API.post(url, body)
        .then((response) => {
          console.log(response);
          Toast({
            position: "top-right",
            colorScheme: "green",
            title: "Requizição realizada com sucesso",
          });
        })
        .catch((response) => {
          Toast({
            position: "top-right",
            colorScheme: "red",
            title: "Erro na requisição verifique as informações",
            description: "Erro!",
          });
        });
    }
  };
  return (
    <SubmitContext.Provider value={{ submit }}>
      {children}
    </SubmitContext.Provider>
  );
}
