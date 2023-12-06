import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { formatData } from "../../../genericService";
import { useState } from "react";
import { ICliente, clienteDefault } from "../../../model/Cliente";
import ICompromisso from "../../../model/compromisso";

interface Props {
  title: string;
  compromisso: ICompromisso;
}

export default function AccordionCompromisso({ title, compromisso }: Props) {
  const cliente =
    compromisso.tarefas != null
      ? compromisso?.tarefas?.cliente
      : compromisso?.oportunidades?.cliente;
  if (!compromisso.uuid) {
    return <></>;
  }

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {title} - {compromisso.tipoCompromisso}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Box>
          <p>
            {new Date(compromisso.inicioCompromisso).toLocaleString()}{" "}
            {new Date(compromisso.fimCompromisso).toLocaleString()}
          </p>
          <Box border={"1px"} px={"2"} py={"2"} borderRadius={"base"} mt={"2"}>
            <Box fontWeight={"bold"}>
              <h4>Cliente</h4>
            </Box>
            <Box></Box>
            <Box>
              <Text fontSize={"small"} w={"full"}>
                {cliente?.nome} - {cliente?.sobrenome}
              </Text>
            </Box>
            <Box>
              <Text fontWeight={"bold"} fontSize={"small"}>
                Contato
              </Text>
              <Text fontSize={"small"} w={"full"}>
                {cliente?.contato?.telefone} - {cliente?.contato?.telefone2} -{" "}
                {cliente?.contato?.email}
              </Text>
            </Box>
            <Box>
              <Text fontSize={"small"} fontWeight={"bold"}>
                Faturamento
              </Text>
              <Text fontSize={"small"} w={"full"}>
                {cliente?.minFaturamento} - {cliente?.maxFaturamento}
              </Text>
            </Box>
          </Box>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
}
