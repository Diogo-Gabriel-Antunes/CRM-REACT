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
import ICampanha, { createTableStructureCampanha } from "../../model/campanha";

interface Props {
  uuid: string;
  setUuid: React.Dispatch<SetStateAction<string>>;
}

export default function ModalPesquisaCampanhaGeneric({ uuid, setUuid }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagina, setPagina] = useState(0);
  const toast = useToast();
  const [campanha, setCampanha] = useState<ICampanha[]>([]);
  const tableStructure = createTableStructureCampanha(campanha);
  const [nomeCampanha, setNomeCampanha] = useState("");

  function getCampanha() {
    API.get(`/campanha?offset=${pagina}`).then((response) =>
      setCampanha(response.data)
    );
  }

  function pesquisar() {
    API.get(`/campanha?nomeCampanha=${nomeCampanha}&offset=${0}`).then(
      (response) => setCampanha(response.data)
    );
  }

  useEffect(() => {
    getCampanha();
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
          <ModalHeader>Pesquisa campanha</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={3} my={"5"}>
              <Box display={"flex"}>
                <Input
                  placeholder="Nome Campanha"
                  value={nomeCampanha}
                  onChange={(e) => setNomeCampanha(e.target.value)}
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
                refresh={getCampanha}
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
