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
import IEtapaFunil, {
  createTableStructureEtapaFunil,
} from "../../model/etapaFunil";
import { createTableStructureFunil } from "../../cliente/funil";
import IFunil from "../../model/funil";

interface Props {
  uuid: string;
  setUuid: React.Dispatch<SetStateAction<string>>;
}

export default function ModalPesquisaFunilGeneric({ uuid, setUuid }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagina, setPagina] = useState(0);
  const toast = useToast();
  const [funil, setFunil] = useState<IFunil[]>([]);
  const tableStructure = createTableStructureFunil(funil);
  const [nomeFunil, setNomeFunil] = useState("");

  function getFunil() {
    API.get(`/funil`).then((response) => setFunil(response.data));
  }

  function pesquisar() {
    API.get(`/funil?nomeFunil=${nomeFunil}`).then((response) =>
      setFunil(response.data)
    );
  }

  useEffect(() => {
    getFunil();
  }, [pagina]);

  return (
    <>
      <IconButton
        aria-label="pesquisa funil"
        icon={<Search2Icon />}
        colorScheme="green"
        ml={"8"}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pesquisa Funil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={3} my={"5"}>
              <Box display={"flex"}>
                <Input
                  placeholder="Nome"
                  value={nomeFunil}
                  onChange={(e) => setNomeFunil(e.target.value)}
                />
                <IconButton
                  aria-label="pesquisa"
                  icon={<Search2Icon />}
                  colorScheme="green"
                  ml={"5"}
                />
              </Box>
            </SimpleGrid>
            <Box h={"container.sm"} overflow={"auto"}>
              {" "}
              <TableComponent
                pagina={pagina}
                refresh={getFunil}
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
