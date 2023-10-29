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

export default function ModalAdicionarCampanha({ editar, uuid }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nome, setNome] = useState("");
  const toast = useToast();

  function onSave() {
    const dto = { campanha: nome };
    if (editar && uuid) {
      API.put(`/campanha/${uuid}`, dto).then((response) => {
        console.log(response);
        toast({
          duration: 3000,
          description: "Atualizado com sucesso",
          colorScheme: "green",
        });
      });
    } else {
      API.post("/campanha", dto).then((response) => {
        toast({
          duration: 3000,
          description: "salvo com sucesso",
          colorScheme: "green",
        });
      });
    }
  }

  function getCampanha() {
    API.get(`/campanha/${uuid}`).then((response) => {
      setNome(response.data.nomeCampanha);
    });
  }

  return (
    <>
      <Button
        onClick={() => {
          if (editar) {
            if (uuid) {
              getCampanha();
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
          <ModalHeader>Adicionar Campanha</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box>
                <Input
                  placeholder="Nome Campanha"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
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
