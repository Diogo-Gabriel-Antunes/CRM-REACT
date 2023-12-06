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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ITemplate, templateDefault } from "../../../model/template";
import { useState } from "react";

interface Props {
  uuid?: string;
  editar?: boolean;
  refresh: () => void;
}

export default function ModalAdicionarTemplate({
  uuid,
  editar,
  refresh,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [template, setTemplate] = useState<ITemplate>(templateDefault);
  const toast = useToast({
    duration: 3000,
  });

  function toastSave() {
    toast({
      colorScheme: "green",
      description: "Template salvo com sucesso",
    });
  }

  function onSave() {
    if (uuid) {
      axios
        .put(`http://localhost:8081/template/${uuid}`, template)
        .then((response) => {
          toastSave();
          refresh();
        });
    } else {
      axios
        .post("http://localhost:8081/template", template)
        .then((response) => {
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
                description: "Selecione um template",
              });
              return;
            }
            axios
              .get(`http://localhost:8081/template/${uuid}`)
              .then((response) => {
                setTemplate(response.data);
              });
          } else {
            setTemplate(templateDefault);
          }
          onOpen();
        }}
      >
        {editar ? "Editar" : "Adicionar"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexDir={"column"}>
              <Box mb={"5"}>
                <Input
                  placeholder="Nome"
                  value={template.nomeTemplate}
                  onChange={(e) =>
                    setTemplate({ ...template, nomeTemplate: e.target.value })
                  }
                />
              </Box>
              <Box>
                <Textarea
                  placeholder="Template"
                  value={template?.template}
                  onChange={(e) =>
                    setTemplate({ ...template, template: e.target.value })
                  }
                />
              </Box>
            </Box>
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
