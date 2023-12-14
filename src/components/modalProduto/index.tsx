import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import React, { SetStateAction, useEffect, useState } from "react";
import API, { MSEmail } from "../../API";
import { TableComponent } from "../table";
import { ITemplate, createTableStructureTemplate } from "../../model/template";
import { IProduto, createTableStructureProduto } from "../../model/produto";

interface Props {
  uuid: string;
  setUuid: React.Dispatch<SetStateAction<string>>;
  produto: IProduto;
}

export default function ModalPesquisaProdutoGeneric({
  uuid,
  setUuid,
  produto,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagina, setPagina] = useState(0);
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const tableStructure = createTableStructureProduto(produtos);
  const [usuario, setUsuario] = useState("");
  function getProduto() {
    API.get(`/produto`).then((response) => setProdutos(response.data));
  }

  function pesquisar() {
    API.get(`/template`).then((response) => setProdutos(response.data));
  }

  useEffect(() => {
    getProduto();
  }, [pagina]);

  return (
    <>
      <InputGroup>
        <Input placeholder="Produto" value={produto.nome} disabled />
        <InputRightElement>
          <IconButton
            aria-label="pesquisa cliente"
            icon={<Search2Icon />}
            colorScheme="green"
            ml={"8"}
            onClick={onOpen}
          />
        </InputRightElement>
      </InputGroup>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pesquisa cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={3} my={"5"}>
              <Box display={"flex"}>
                <Input
                  placeholder="Nome Template"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
                <IconButton
                  aria-label="pesquisa"
                  icon={<Search2Icon />}
                  colorScheme="green"
                  ml={"5"}
                  onClick={pesquisar}
                />
              </Box>
            </SimpleGrid>
            <Box h={"container.sm"} overflow={"auto"}>
              {" "}
              <TableComponent
                pagina={pagina}
                refresh={getProduto}
                setPagina={setPagina}
                setUuid={setUuid}
                uuid={uuid}
                props={tableStructure}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
