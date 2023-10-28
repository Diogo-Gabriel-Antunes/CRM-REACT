import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useCheckboxGroup,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import API from "../../../API";

interface Props {
  editar?: boolean;
  uuid?: string;
}

export default function ModalAdicionarFunil({ editar, uuid }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nome, setNome] = useState("");
  const toast = useToast();
  const { value, getCheckboxProps, setValue } = useCheckboxGroup();
  function onSave() {
    const dto = { nomeFunil: nome, integracoes: value };
    if (editar && uuid) {
      API.put(`/funil/${uuid}`, dto);
    } else {
      API.post("/funil", dto);
    }
  }

  function getFunil() {
    API.get(`/funil/${uuid}`).then((response) => {
      console.log(response);
    });
  }

  console.log(value);

  return (
    <>
      <Button
        onClick={() => {
          if (editar) {
            if (uuid) {
              getFunil();
              onOpen();
            } else {
              toast({
                duration: 3000,
                colorScheme: "red",
                description: "Necessario selecionar um funil",
              });
            }
          } else {
            onOpen();
          }
        }}
        colorScheme={editar ? "blue" : "green"}
        variant={"outline"}
        mx={editar ? "5" : "0.5"}
      >
        {editar ? "Editar" : "Adicionar"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Funil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"}>
              <Box>
                <Input
                  placeholder="Nome funil"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Box>
              <Box ml={"5"}>
                <CheckboxGroup
                  colorScheme="green"
                  value={value}
                  onChange={(e) => setValue(e)}
                >
                  <Stack spacing={[1, 5]}>
                    <Checkbox value="email">E-mail</Checkbox>
                    <Checkbox value="whatsapp">WhatsApp</Checkbox>
                    <Checkbox value="google-meet">Google Meet</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button variant="ghost" onClick={onSave}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
