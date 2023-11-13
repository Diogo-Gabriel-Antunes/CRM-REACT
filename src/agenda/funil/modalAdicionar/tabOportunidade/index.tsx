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
import ModalPesquisaFunilGeneric from "../../../../components/modalFunil";
import ModalPesquisaCampanhaGeneric from "../../../../components/modalCampanha";
import ICampanha from "../../../../model/campanha";

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
  const [uuidEtapaFunil, setUuidEtapaFunil] = useState("");
  const [uuidFunil, setUuidFunil] = useState("");
  const [uuidCampanha, setUuidCampanha] = useState("");
  const [funilSelecionado, setFunilSelecionado] = useState<IFunil>();
  const [campanhaSelecionada, setCampanhaSelecionada] = useState<ICampanha>();
  const [etapaFunilSelecionado, setEtapaFunilSelecionado] =
    useState<IEtapaFunil>();
  const toast = useToast();
  function onSave() {
    API.post("/compromisso/oportunidade", compromisso).then((response) => {
      toast({
        duration: 3000,
        colorScheme: "green",
        description: "Oportunidade salva com sucesso",
      });
    });
  }

  useEffect(() => {
    if (uuidFunil !== "") {
      API.get<IFunil>(`/funil/${uuidFunil}`).then((response) => {
        setFunilSelecionado(response.data);
        setCompromisso({
          ...compromisso,
          oportunidades: { ...compromisso.oportunidades, funil: response.data },
        });
      });
    }
  }, [uuidFunil]);

  useEffect(() => {
    if (uuidEtapaFunil !== "") {
      API.get(`/etapa-funil/${uuidFunil}`).then((response) => {
        setEtapaFunilSelecionado(response.data);
        setCompromisso({
          ...compromisso,
          oportunidades: {
            ...compromisso.oportunidades,
            etapaDoFunil: response.data,
          },
        });
      });
    }
  }, [uuidEtapaFunil]);

  useEffect(() => {
    if (uuidCampanha !== "") {
      API.get(`/campanha/${uuidCampanha}`).then((response) => {
        setCampanhaSelecionada(response.data);
        setCompromisso({
          ...compromisso,
          oportunidades: {
            ...compromisso.oportunidades,
            campanha: response.data,
          },
        });
      });
    }
  }, [uuidCampanha]);

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
              placeholder="Funil"
              value={funilSelecionado?.nomeFunil}
              disabled
            />
            <InputRightElement width="4.5rem">
              <ModalPesquisaFunilGeneric
                setUuid={setUuidFunil}
                uuid={uuidFunil}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box my={"5"}>
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
        <Box my={"5"}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              placeholder="Campanha"
              value={campanhaSelecionada?.nomeCampanha}
              disabled
            />
            <InputRightElement width="4.5rem">
              <ModalPesquisaCampanhaGeneric
                setUuid={setUuidCampanha}
                uuid={uuidCampanha}
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
