import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { IProduto, produtoDefault } from "../../../model/produto";
import API from "../../../API";
import {
  IMateriaPrima,
  materiaPrimaDefault,
} from "../../../model/materiaPrima";

interface Props {
  uuid?: string;
  editar?: boolean;
  refresh: () => void;
}

export default function ModalAdicionarMateriaPrima({
  uuid,
  editar,
  refresh,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [materiaPrima, setMateriaPrima] =
    useState<IMateriaPrima>(materiaPrimaDefault);
  const toast = useToast({
    duration: 3000,
  });

  function toastSave() {
    toast({
      colorScheme: "green",
      description: "Produto salvo com sucesso",
    });
  }

  function onSave() {
    if (uuid) {
      API.put(`/materia-prima/${uuid}`, materiaPrima).then((response) => {
        toastSave();
        refresh();
      });
    } else {
      API.post("/materia-prima", materiaPrima).then((response) => {
        toastSave();
        refresh();
      });
    }
  }

  return (
    <>
      <Button
        colorScheme="teal"
        variant={"outline"}
        mx={editar ? "6" : "0"}
        onClick={() => {
          if (editar) {
            if (!uuid) {
              return toast({
                colorScheme: "red",
                description: "Selecione um produto",
              });
              return;
            }
            API.get(`/materia-prima/${uuid}`).then((response: any) => {
              setMateriaPrima(response.data);
            });
          }
          onOpen();
        }}
      >
        {editar ? "Editar" : "Adicionar"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Materia Prima</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={10}>
              <Box>
                <FormLabel fontWeight={"bold"}>Nome</FormLabel>

                <Input
                  placeholder="Nome"
                  value={materiaPrima.nome}
                  onChange={(e) =>
                    setMateriaPrima({ ...materiaPrima, nome: e.target.value })
                  }
                />
              </Box>
              <Box>
                <FormLabel fontWeight={"bold"}>Quantidade</FormLabel>
                <Input
                  type="number"
                  placeholder="Quantidade"
                  value={materiaPrima?.quantidade.toString()}
                  onChange={(e) =>
                    setMateriaPrima({
                      ...materiaPrima,
                      quantidade: Number(e.target.value),
                    })
                  }
                />
              </Box>
            </SimpleGrid>
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
