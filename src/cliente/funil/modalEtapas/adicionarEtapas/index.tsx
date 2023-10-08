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
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import API from "../../../../API";
import { useState } from "react";

interface Props {
  funilSelected: string;
  etapaUuid?: string;
  editar?: boolean;
}

export default function ModalAdicionarEtapas({
  funilSelected,
  etapaUuid,
  editar,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [nomeEtapa, setNomeEtapa] = useState("");
  const [nivel, setNivel] = useState("");
  const [finalizacao, setFinalizacao] = useState("");

  const onSave = () => {
    var dto = {
      etapa: nomeEtapa,
      nivel: nivel,
      finalizacao: finalizacao,
      funil: {
        uuid: funilSelected,
      },
    };

    if (editar) {
      API.put("/etapa-funil/" + etapaUuid, dto).then((response) => {
        console.log(response);
      });
    } else {
      API.post("/etapa-funil", dto).then((response) => {
        console.log(response);
      });
    }
  };

  return (
    <>
      <Button
        variant="solid"
        colorScheme={editar ? "blue" : "green"}
        onClick={() => {
          if (editar && etapaUuid) {
            API.get(`/etapa-funil/${etapaUuid}`).then((response) => {
              console.log(response);
            });
          } else {
            onOpen();
          }
        }}
        w={"full"}
      >
        {editar ? "Editar" : "Adicionar"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Etapas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} w={"full"}>
              <Box margin={"auto"}>
                <Box>
                  <Box display={"flex"}>
                    <Box display={"flex"} flexDir={"column"} mr={"10"}>
                      <Input
                        variant={"flushed"}
                        placeholder="Nome Etapa"
                        w={"full"}
                        onChange={(e) => setNomeEtapa(e.target.value)}
                      />
                    </Box>
                    <Box
                      display={"flex"}
                      flexDir={"column"}
                      placeholder="Nivel"
                    >
                      <Select
                        placeholder="Nivel"
                        mb={"5"}
                        onChange={(e) => setNivel(e.target.value)}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </Select>
                      <Select
                        placeholder="Finalização"
                        onChange={(e) => setFinalizacao(e.target.value)}
                      >
                        <option></option>
                        <option value={"true"}>Sim</option>
                        <option value={"false"}>Não</option>
                      </Select>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme="green" mr={3} onClick={onSave}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
