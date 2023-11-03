import { Box, Input } from "@chakra-ui/react";
import ISelect from "../../../../model/select";
import SelectPadrao from "../../../../components/select";
import ICompromisso from "../../../../model/compromisso";
import { SetStateAction } from "react";

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

  return (
    <>
      <Box>
        <Box>
          <Input type="date" value={data} readOnly disabled bg={"gray.200"} />
        </Box>
        <Box my={"5"}>
          <SelectPadrao
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
            value={compromisso.tarefas.horaMarcada}
            onChange={(e) =>
              setCompromisso({
                ...compromisso,
                tarefas: {
                  ...compromisso.tarefas,
                  horaMarcada: e.target.value,
                },
              })
            }
          />
        </Box>
      </Box>
    </>
  );
}
