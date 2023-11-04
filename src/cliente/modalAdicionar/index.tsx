import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import TabCliente from "./tabCliente";
import React, { useContext, useEffect } from "react";
import { ClienteClear, ClienteContext } from "../../context/clienteContext";
import API from "../../API";
import { ICliente } from "../../model/Cliente";

interface Props {
  uuid?: string;
  editar?: boolean;
  setClientes: React.Dispatch<React.SetStateAction<ICliente[]>>;
}

export default function ModalAdicionarCliente({
  uuid,
  editar,
  setClientes,
}: Props) {
  const { cliente, setCliente, agendamento } = useContext(ClienteContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast({
    duration: 3000,
  });

  function getCliente() {
    API.get("/cliente?offset=0").then((response) => setClientes(response.data));
  }

  function toastSave() {
    toast({
      colorScheme: "green",
      description: "Cliente salvo com sucesso",
    });
  }

  function onSave() {
    var dto = { cliente, agendamento };
    if (uuid) {
      API.put(`/cliente/${uuid}`, dto.cliente).then((response) => {
        toastSave();
        getCliente();
      });
    } else {
      API.post("/cliente", dto).then((response) => {
        toastSave();
        getCliente();
      });
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          if (editar) {
            if (!uuid) {
              return toast({
                colorScheme: "red",
                description: "Selecione um cliente",
              });
              return;
            }
            API.get(`/cliente/${uuid}`).then((response) => {
              setCliente(response.data);
            });
          } else {
            setCliente(ClienteClear);
          }
          onOpen();
        }}
        colorScheme="teal"
        variant={"outline"}
        mx={editar ? "6" : "0"}
      >
        {editar ? "Editar" : "Adicionar"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TabCliente editar={editar} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>

            <Button variant="solid" colorScheme="green" onClick={onSave}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
