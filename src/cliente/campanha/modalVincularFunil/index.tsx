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
  Select,
  Stack,
  useCheckboxGroup,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import API from "../../../API";
import ISelect from "../../../model/select";

interface Props {
  uuid: string;
}

export default function ModalVincularFunil({ uuid }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [funils, setFunils] = useState([]);
  const [funilUuid, setFunilUuid] = useState("");
  function onSave() {
    API.put(`/campanha/vincular-funil/${uuid}/${funilUuid}`).then(
      (response) => {
        console.log(response);
        toast({
          duration: 3000,
          description: "Atualizado com sucesso",
          colorScheme: "green",
        });
      }
    );
  }

  function getFunilSelect() {
    API.get(`/funil/select`).then((response) => {
      setFunils(response.data);
    });
  }

  return (
    <>
      <Box
        onClick={() => {
          if (uuid) {
            getFunilSelect();
            onOpen();
          } else {
            toast({
              duration: 3000,
              colorScheme: "red",
              description: "Necessario selecionar um funil",
            });
          }
        }}
      >
        Vincular funil
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vincular Funil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box>
                <Select
                  placeholder="Funil"
                  onChange={(e) => setFunilUuid(e.target.value)}
                  value={funilUuid}
                >
                  {funils.map((funil: ISelect) => (
                    <option value={funil.value}>{funil.label}</option>
                  ))}
                </Select>
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
