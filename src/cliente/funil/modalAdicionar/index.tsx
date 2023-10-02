import {
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

  function onSave() {
    const dto = { nomeFunil: nome };
    if (editar && uuid) {
      API.put(`/funil/${uuid}`, dto);
    } else {
      API.post("/funil", dto);
    }
  }

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
            <Box>
              <Box display={"flex"}>
                <Input
                  placeholder="Nome funil"
                  onChange={(e) => setNome(e.target.value)}
                />
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
