import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
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
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useCheckboxGroup,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { SetStateAction, useEffect, useState } from "react";
import API from "../../API";
import { TableComponent } from "../table";
import { clienteTableStructure } from "../../cliente";
import { ICliente, clienteDefault } from "../../model/Cliente";

interface Props {
  uuid: string;
  setUuid: React.Dispatch<SetStateAction<string>>;
}

export default function ModalPesquisaClienteGeneric({ uuid, setUuid }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagina, setPagina] = useState(0);
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const tableStructure = clienteTableStructure(clientes);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  function getCliente() {
    API.get(`/cliente?offset=${pagina}`).then((response) =>
      setClientes(response.data)
    );
  }

  function pesquisar() {
    API.get(
      `/cliente?offset=${pagina}&nome=${nome}&sobrenome=${sobrenome}`
    ).then((response) => setClientes(response.data));
  }

  useEffect(() => {
    getCliente();
  }, [pagina]);

  return (
    <>
      <IconButton
        aria-label="pesquisa cliente"
        icon={<Search2Icon />}
        colorScheme="green"
        ml={"8"}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pesquisa cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={3} my={"5"}>
              <Input
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Box display={"flex"}>
                <Input
                  placeholder="Sobrenome"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
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
                refresh={getCliente}
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
