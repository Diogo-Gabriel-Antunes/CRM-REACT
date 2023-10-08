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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import API from "../../../API";
import { TableComponent, TableOptions } from "../../../components/table";
import ModalAdicionarEtapas from "./adicionarEtapas";

interface Props {
  uuid?: string;
}

export default function ModalEtapas({ uuid }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [etapas, setEtapas] = useState([]);
  const [uuidEtapas, setUuidEtapas] = useState("");
  const [pagina, setPagina] = useState(0);
  const toast = useToast();

  const getEtapas = () => {
    API.get("/etapa-funil?funilUuid=" + uuid!).then((response) => {
      setEtapas(response.data);
    });
  };

  useEffect(() => {
    getEtapas();
  }, [uuid]);

  const tableStructure: TableOptions = {
    data: etapas,
    headers: ["Etapa", "Nivel", "Finalização", "Ativo"],
    title: "Etapas",
    options: [
      {
        headerOption: "Etapa",
        listOption: "etapa",
      },
      {
        headerOption: "Nivel",
        listOption: "nivel",
      },
      {
        headerOption: "Finalização",
        listOption: "finalizacao",
      },
      {
        headerOption: "Ativo",
        listOption: "ativo",
      },
    ],
  };

  return (
    <>
      <Box
        onClick={() => {
          if (uuid) {
            onOpen();
          } else {
            toast({
              duration: 3000,
              description: "Necessario selecionar um funil",
              colorScheme: "red",
            });
          }
        }}
        w={"full"}
      >
        Etapas
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Etapas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"}>
              <ModalAdicionarEtapas funilSelected={uuid!} />
              <ModalAdicionarEtapas
                funilSelected={uuid!}
                etapaUuid={uuidEtapas}
                editar
              />
            </Box>
            <TableComponent
              pagina={pagina}
              props={tableStructure}
              refresh={getEtapas}
              setPagina={setPagina}
              setUuid={setUuidEtapas}
              uuid={uuidEtapas}
            />
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
