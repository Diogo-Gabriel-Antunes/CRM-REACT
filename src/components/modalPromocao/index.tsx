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
import { IPromocao, createTableStructurePromocao } from "../../model/promocao";

interface Props {
  uuid: string;
  setUuid: React.Dispatch<SetStateAction<string>>;
  promocao: IPromocao;
}

export default function ModalPesquisaPromocoesGeneric({
  uuid,
  setUuid,
  promocao,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagina, setPagina] = useState(0);
  const [promocoes, setPromocoes] = useState<IPromocao[]>([]);
  const tableStructure = createTableStructurePromocao(promocoes);
  const [usuario, setUsuario] = useState("");
  function getPromocao() {
    API.get(`/promocao`).then((response) => setPromocoes(response.data));
  }

  function pesquisar() {
    API.get(`/template`).then((response) => setPromocoes(response.data));
  }

  useEffect(() => {
    getPromocao();
  }, [pagina]);

  return (
    <>
      <InputGroup>
        <Input placeholder="Promocao" value={promocao.nomePromocao} disabled />
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
                refresh={getPromocao}
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
