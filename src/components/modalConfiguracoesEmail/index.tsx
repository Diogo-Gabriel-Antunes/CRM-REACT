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
import API, { MSEmail } from "../../API";
import { TableComponent } from "../table";
import { clienteTableStructure } from "../../cliente";
import { ICliente, clienteDefault } from "../../model/Cliente";
import {
  IConfiguracaoEmail,
  createTableStructureConfiguracaoEmail,
} from "../../model/configuracaoEmail";

interface Props {
  uuid: string;
  setUuid: React.Dispatch<SetStateAction<string>>;
  configuracaoEmail: IConfiguracaoEmail;
}

export default function ModalPesquisaConfiguracoesEmailGeneric({
  uuid,
  setUuid,
  configuracaoEmail,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagina, setPagina] = useState(0);
  const [configuracoesEmail, setConfiguracoesEmail] = useState<
    IConfiguracaoEmail[]
  >([]);
  const tableStructure =
    createTableStructureConfiguracaoEmail(configuracoesEmail);
  const [usuario, setUsuario] = useState("");
  function getCliente() {
    MSEmail.get(`/configuracao-email`).then((response) =>
      setConfiguracoesEmail(response.data)
    );
  }

  function pesquisar() {
    MSEmail.get(`/configuracao-email?username=${usuario}`).then((response) =>
      setConfiguracoesEmail(response.data)
    );
  }

  useEffect(() => {
    getCliente();
  }, [pagina]);

  return (
    <>
      <InputGroup>
        <Input
          placeholder="Configuração Email"
          value={configuracaoEmail.username}
          disabled
        />
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
                  placeholder="Usuario"
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
