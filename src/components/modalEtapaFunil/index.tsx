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

interface Props {
  uuid: string;
  setUuid: React.Dispatch<SetStateAction<string>>;
  funilUuid: string;
}

export default function ModalPesquisaEtapaFunilGeneric({
  uuid,
  setUuid,
  funilUuid,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagina, setPagina] = useState(0);
  const toast = useToast();
  const [etapaFunil, setEtapaFunil] = useState<IEtapaFunil[]>([]);
  const tableStructure = createTableStructureEtapaFunil(
    etapaFunil,
    "Etapa Funil"
  );
  const [etapa, setEtapa] = useState("");

  function getEtapaFunil() {
    if (funilUuid !== "") {
      API.get(`/etapa-funil?funilUuid=${funilUuid}`).then((response) =>
        setEtapaFunil(response.data)
      );
    }
  }

  function pesquisar() {
    API.get(`/etapa-funil?funilUuid=${funilUuid}&etapa=${etapa}`).then(
      (response) => setEtapaFunil(response.data)
    );
  }

  useEffect(() => {
    getEtapaFunil();
  }, [pagina]);

  function openModal() {
    if (funilUuid) {
      onOpen();
      getEtapaFunil();
    } else {
      toast({
        duration: 3000,
        colorScheme: "red",
        description: "Necessario selecionar um funil antes",
      });
    }
  }

  return (
    <>
      <IconButton
        aria-label="pesquisa cliente"
        icon={<Search2Icon />}
        colorScheme="green"
        ml={"8"}
        onClick={openModal}
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pesquisa etapa funil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={3} my={"5"}>
              <Box display={"flex"}>
                <Input
                  placeholder="Etapa"
                  value={etapa}
                  onChange={(e) => setEtapa(e.target.value)}
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
                refresh={getEtapaFunil}
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
