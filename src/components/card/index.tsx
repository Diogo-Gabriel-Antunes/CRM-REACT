import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { ILead, Leads } from "../../model/lead";
import { useDrag, useDrop } from "react-dnd";
import React, { SetStateAction, useRef, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import API from "../../API";

interface Props {
  etapaName: string;
  leads: Leads[];
  refresh: (funilUuid: string) => void;
}

interface Item {
  uuid: string;
  posicao: number;
  lead: ILead;
}

export default function CardLead({ etapaName, leads, refresh }: Props) {
  const [etapaUuid, setEtapaUuid] = useState("");
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement | null>();
  const [, dropRef] = useDrop({
    accept: "Box",
    hover(item: Item, monitor) {
      console.log(item);
      if (!etapaName && etapaName === item?.lead?.etapaDofunil?.etapa) {
        return;
      }

      const targetSize = ref?.current?.getBoundingClientRect();

      const targetCenter = (targetSize?.bottom! - targetSize?.top!) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset?.y! - targetSize?.top!;

      API.put(
        `/lead/drag-drop/${item.lead.uuid}?etapaName=${etapaName}`,
        item
      ).then((response) => {
        console.log(response);
        refresh(item.lead.funil.uuid);
      });
      return;
    },
    canDrop(item, monitor) {
      return true;
    },
    collect(monitor) {
      monitor.getDropResult();
    },
  });

  dropRef(ref);

  return (
    <>
      <Box mx={"2"}>
        <Box>
          <Box minW={"96"} w={"max"} bg={"yellow.100"} p={"30"}>
            <Text>{etapaName}</Text>
          </Box>
        </Box>
        <Box ref={ref as any}>
          {leads.length === 0 ? (
            <>
              <Box>
                <CardVazio
                  etapa={etapaName}
                  setEtapa={setEtapaUuid}
                  index={0}
                  setIndex={setIndex}
                />
              </Box>
            </>
          ) : (
            leads?.map((lead, index) => (
              <>
                <Box>
                  <Card
                    lead={lead.lead}
                    index={index}
                    etapa={etapaName}
                    setEtapa={setEtapaUuid}
                    setIndex={setIndex}
                  />
                </Box>
              </>
            ))
          )}
        </Box>
      </Box>
    </>
  );
}

function Card({
  lead,
  etapa,
  setEtapa,
  index,
  setIndex,
}: {
  lead: ILead;
  index: number;
  etapa: string;
  setEtapa: React.Dispatch<SetStateAction<string>>;
  setIndex: React.Dispatch<SetStateAction<number>>;
}) {
  const [, dragRef] = useDrag({
    item: { uuid: lead.uuid, posicao: index, lead: lead },
    type: "Box",
    isDragging: (monitor) => monitor.isDragging(),
    end(draggedItem, monitor) {
      setEtapa(etapa);
      setIndex(index);
    },
  });

  return (
    <>
      <Box
        border={"1px"}
        borderRadius={"base"}
        my={"3"}
        cursor={"pointer"}
        ref={dragRef}
      >
        <Box bg={"blue.100"} px={"2"} py={"1"}>
          <Text fontSize={"sm"}>{lead.descricao}</Text>
        </Box>
        <Divider />
        <Box p={"2"}>
          <Box>
            <Text>Data: {new Date(lead.data).toLocaleDateString()}</Text>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Box>
                <Text>
                  {lead?.cliente?.nome} {lead?.cliente?.sobrenome}
                </Text>
              </Box>
              {lead?.cliente?.contato?.email && (
                <Box>
                  <Text>{lead?.cliente?.contato?.email}</Text>
                </Box>
              )}
              <Box></Box>
            </Box>
            <Box>
              <Box>
                <Text>{lead?.cliente?.cargo}</Text>
              </Box>
              {lead?.cliente?.contato?.telefone && (
                <Box>
                  <Text>
                    {lead?.cliente?.contato?.telefone} -{" "}
                    {lead?.cliente?.contato?.telefone2}
                  </Text>
                </Box>
              )}
              {lead?.cliente?.minFaturamento && (
                <Box>
                  <Text>
                    {lead?.cliente.minFaturamento} -{" "}
                    {lead?.cliente.maxFaturamento}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function CardVazio({
  etapa,
  setEtapa,
  index,
  setIndex,
}: {
  index: number;
  setIndex: React.Dispatch<SetStateAction<number>>;
  etapa: string;
  setEtapa: React.Dispatch<SetStateAction<string>>;
}) {
  const [, dragRef] = useDrag({
    item: { etapa, index: 0 },
    type: "Box",
    isDragging: (monitor) => monitor.isDragging(),
    end(draggedItem, monitor) {
      setEtapa(etapa);
      setIndex(index);
    },
  });

  return (
    <>
      <Box
        border={"1px"}
        borderRadius={"base"}
        my={"3"}
        cursor={"pointer"}
        ref={dragRef}
      >
        <Box bg={"blue.100"} px={"2"} py={"1"} h={"16"}>
          <Box display={"flex"} alignItems={"center"}>
            <Box mr={"2"} ml={"3"}>
              <AddIcon />
            </Box>
            <Box>
              <Heading size={"md"}>Arraste aqui</Heading>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
