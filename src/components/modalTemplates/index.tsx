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
import { MSEmail } from "../../API";
import { TableComponent } from "../table";
import { ITemplate, createTableStructureTemplate } from "../../model/template";

interface Props {
  uuid: string;
  setUuid: React.Dispatch<SetStateAction<string>>;
  tempĺate: ITemplate;
}

export default function ModalPesquisaTemplateGeneric({
  uuid,
  setUuid,
  tempĺate,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagina, setPagina] = useState(0);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const tableStructure = createTableStructureTemplate(templates);
  const [usuario, setUsuario] = useState("");
  function getTemplate() {
    MSEmail.get(`/template?ativo=true`).then((response) =>
      setTemplates(response.data)
    );
  }

  function pesquisar() {
    MSEmail.get(`/template`).then((response) => setTemplates(response.data));
  }

  useEffect(() => {
    getTemplate();
  }, [pagina]);

  return (
    <>
      <InputGroup>
        <Input placeholder="Template" value={tempĺate.nomeTemplate} disabled />
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
                refresh={getTemplate}
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
