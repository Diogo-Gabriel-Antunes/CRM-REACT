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
  SimpleGrid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { IProduto, produtoDefault } from "../../../model/produto";
import API from "../../../API";

interface Props {
  uuid?: string;
  editar?: boolean;
  refresh: () => void;
}

export default function ModalAdicionarProduto({
  uuid,
  editar,
  refresh,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [produto, setProduto] = useState<IProduto>(produtoDefault);
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
      API.put(`/produto/${uuid}`, produto).then((response) => {
        toastSave();
        refresh();
      });
    } else {
      API.post("/produto", produto).then((response) => {
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
            API.get(`/produto/${uuid}`).then((response) => {
              setProduto(response.data);
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
          <ModalHeader>Adicionar Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={10}>
              <Box>
                <Input
                  placeholder="Nome"
                  value={produto.nome}
                  onChange={(e) =>
                    setProduto({ ...produto, nome: e.target.value })
                  }
                />
              </Box>
              <Box>
                <Input
                  type="number"
                  placeholder="Preço"
                  value={produto?.preco.toString()}
                  onChange={(e) =>
                    setProduto({ ...produto, preco: Number(e.target.value) })
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
