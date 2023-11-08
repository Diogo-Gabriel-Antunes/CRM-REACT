import { Box, IconButton, Input, useToast } from "@chakra-ui/react";
import ISelect from "../../../../model/select";
import SelectPadrao from "../../../../components/select";
import ICompromisso from "../../../../model/compromisso";
import { SetStateAction, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import API from "../../../../API";

interface Props {
  data: string;
  compromisso: ICompromisso;
  setCompromisso: React.Dispatch<SetStateAction<ICompromisso>>;
}

export default function TabTarefa({
  data,
  compromisso,
  setCompromisso,
}: Props) {
  const [horaMarcada, setHoraMarcada] = useState("");
  const tipoTarefa: ISelect[] = [
    {
      label: "Ligação",
      value: "LIGACAO",
    },
    {
      label: "E-mail",
      value: "EMAIL",
    },
    {
      label: "Visita",
      value: "VISITA",
    },
    {
      label: "Reunião",
      value: "REUNIAO",
    },
    {
      label: "Tarefa",
      value: "TAREFA",
    },
    {
      label: "Almoço",
      value: "ALMOCO",
    },
    {
      label: "Whatsapp",
      value: "WHATSAPP",
    },
  ];

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

  return (
    <>
      <Box>
        <Box>
          <Input type="date" value={data} readOnly disabled bg={"gray.200"} />
        </Box>
        <Box my={"5"}>
          <SelectPadrao
            placeHolder="Tipo Tarefa"
            onChange={(e) =>
              setCompromisso({
                ...compromisso,
                tarefas: {
                  ...compromisso.tarefas,
                  tipoDeTarefa: e.target.value,
                },
              })
            }
            options={tipoTarefa}
            value={compromisso.tarefas.tipoDeTarefa}
          />
        </Box>
        <Box>
          <Input
            type="time"
            value={horaMarcada}
            onChange={(e) => {
              compromisso.tarefas.horaMarcada?.setHours(
                Number(e.target.value.slice(0, 2)),
                Number(e.target.value.slice(3, 5))
              );
              setCompromisso({
                ...compromisso,
                tarefas: {
                  ...compromisso.tarefas,
                  horaMarcada: compromisso.tarefas.horaMarcada,
                },
              });
              setHoraMarcada(e.target.value);
            }}
          />
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
