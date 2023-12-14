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
import {
  IConfiguracaoEmail,
  configuracaoEmailDefault,
} from "../../../model/configuracaoEmail";
import ISelect from "../../../model/select";
import SelectPadrao from "../../../components/select";
import { MSEmail } from "../../../API";

interface Props {
  uuid?: string;
  editar?: boolean;
  refresh: () => void;
}

export default function ModalAdicionarConfiguracaoEmail({
  uuid,
  editar,
  refresh,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [configuracaoEmail, setConfiguracaoEmail] =
    useState<IConfiguracaoEmail>(configuracaoEmailDefault);
  const toast = useToast({
    duration: 3000,
  });

  function toastSave() {
    toast({
      colorScheme: "green",
      description: "Configuração email salva com sucesso",
    });
  }

  const selectSuportSSL: ISelect[] = [
    {
      label: "Sim",
      value: "true",
    },
    {
      label: "Não",
      value: "false",
    },
  ];

  function onSave() {
    if (uuid) {
      MSEmail.put(`/configuracao-email/${uuid}`, configuracaoEmail).then(
        (response) => {
          toastSave();
          refresh();
        }
      );
    } else {
      MSEmail.post("/configuracao-email", configuracaoEmail).then(
        (response) => {
          toastSave();
          refresh();
        }
      );
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
            MSEmail.get(`/configuracao-email/${uuid}`).then((response) => {
              setConfiguracaoEmail(response.data);
            });
          } else {
            setConfiguracaoEmail(configuracaoEmailDefault);
          }
          onOpen();
        }}
      >
        {editar ? "Editar" : "Adicionar"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Configuração Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={3} spacing={5}>
              <Box mb={"5"}>
                <Input
                  placeholder="Host"
                  value={configuracaoEmail.host}
                  onChange={(e) =>
                    setConfiguracaoEmail({
                      ...configuracaoEmail,
                      host: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <Input
                  placeholder="Username"
                  value={configuracaoEmail.username}
                  onChange={(e) =>
                    setConfiguracaoEmail({
                      ...configuracaoEmail,
                      username: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <Input
                  placeholder="Password"
                  value={configuracaoEmail.password}
                  onChange={(e) =>
                    setConfiguracaoEmail({
                      ...configuracaoEmail,
                      password: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <Input
                  placeholder="Stmp Port"
                  value={configuracaoEmail.stmpPort}
                  onChange={(e) =>
                    setConfiguracaoEmail({
                      ...configuracaoEmail,
                      stmpPort: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <SelectPadrao
                  onChange={(e) =>
                    setConfiguracaoEmail({
                      ...configuracaoEmail,
                      sslSupport: e.target.value,
                    })
                  }
                  options={selectSuportSSL}
                  placeHolder="SSL Suport"
                  value={configuracaoEmail.sslSupport}
                />
              </Box>
            </SimpleGrid>
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
