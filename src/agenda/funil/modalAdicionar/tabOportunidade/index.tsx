import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import ISelect from "../../../../model/select";
import SelectPadrao from "../../../../components/select";
import ICompromisso from "../../../../model/compromisso";
import { SetStateAction, useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import API from "../../../../API";
import ModalPesquisaEtapaFunilGeneric from "../../../../components/modalEtapaFunil";
import IFunil from "../../../../model/funil";
import IEtapaFunil from "../../../../model/etapaFunil";

interface Props {
  data: string;
  compromisso: ICompromisso;
  setCompromisso: React.Dispatch<SetStateAction<ICompromisso>>;
}

export default function TabOportunidade({
  data,
  compromisso,
  setCompromisso,
}: Props) {
  const [horaMarcada, setHoraMarcada] = useState("");
  const [uuidEtapaFunil, setUuidEtapaFunil] = useState("");
  const [uuidFunil, setUuidFunil] = useState("");
  const [funilSelecionado, setFunilSelecionado] = useState<IFunil>();
  const [etapaFunilSelecionado, setEtapaFunilSelecionado] =
    useState<IEtapaFunil>();
  const toast = useToast();
  function onSave() {
    API.post("/compromisso/tarefa", compromisso).then((response) => {
      toast({
        duration: 3000,
        colorScheme: "green",
        description: "Tarefa salva com sucesso",
      });
    });
  }

  useEffect(() => {
    if (uuidFunil !== "") {
      API.get(`/funil/${uuidFunil}`).then((response) =>
        setFunilSelecionado(response.data)
      );
    }
  }, [uuidFunil]);

  return (
    <>
      <Box>
        <Box>
          <Input type="date" value={data} readOnly disabled bg={"gray.200"} />
        </Box>
        <Box my={"5"}>
          <Input placeholder="Nome oportunidade" />
        </Box>
        <Box>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              placeholder="Etapa Funil"
              value={etapaFunilSelecionado?.etapa}
              disabled
            />
            <InputRightElement width="4.5rem">
              <ModalPesquisaEtapaFunilGeneric
                setUuid={setUuidEtapaFunil}
                uuid={uuidEtapaFunil}
                funilUuid={uuidFunil}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box>
          <IconButton
            w="full"
            mt={"5"}
            colorScheme="green"
            aria-label="adicionar tarefa"
            icon={<AddIcon />}
            onClick={onSave}
          />
        </Box>
      </Box>
    </>
  );
}
