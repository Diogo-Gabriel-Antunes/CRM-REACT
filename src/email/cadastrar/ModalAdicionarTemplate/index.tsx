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
import ISelect from "../../../model/select";
import SelectPadrao from "../../../components/select";
import { MSEmail } from "../../../API";
import TemplateVariaveis from "../variaveis";

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

  const selectTipoTemplate: ISelect[] = [
    {
      label: "Venda",
      value: "VENDA",
    },
    { label: "Primeiro Contato", value: "PRIMEIROCONTATO" },
    { label: "Promoção", value: "PROMOCAO" },
  ];

  function onSave() {
    if (uuid) {
      MSEmail.put(`/template/${uuid}`, template).then((response) => {
        toastSave();
        refresh();
      });
    } else {
      MSEmail.post("/template", template).then((response) => {
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
              <SimpleGrid columns={2} spacing={5} mb={"5"}>
                <Box w={"full"}>
                  <Input
                    placeholder="Nome"
                    value={template.nomeTemplate}
                    onChange={(e) =>
                      setTemplate({ ...template, nomeTemplate: e.target.value })
                    }
                  />
                </Box>
                <Box w={"full"}>
                  <SelectPadrao
                    onChange={(e) =>
                      setTemplate({ ...template, tipoTemplate: e.target.value })
                    }
                    options={selectTipoTemplate}
                    placeHolder="Tipo Template"
                    value={template.tipoTemplate}
                  />
                </Box>
              </SimpleGrid>
              <Box>
                <TemplateVariaveis tipoTemplate={template.tipoTemplate} />
                <Input
                  mb={"5"}
                  placeholder="Titulo"
                  onChange={(e) =>
                    setTemplate({ ...template, tipoTemplate: e.target.value })
                  }
                  value={template.tituloTemplate}
                />
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
