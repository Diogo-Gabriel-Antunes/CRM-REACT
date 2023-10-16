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
  const { value, getCheckboxProps, setValue } = useCheckboxGroup();
  function onSave() {
    const dto = { nomeFunil: nome };
    if (editar && uuid) {
      API.put(`/funil/${uuid}`, dto);
    } else {
      API.post("/funil", dto);
    }
  }

  console.log(value);

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" variant={"outline"}>
        Adicionar
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
            <Button variant="ghost">Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
