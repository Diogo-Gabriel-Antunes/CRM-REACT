import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Checkbox,
  CheckboxGroup,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import CargaHorariaBody from "../../components/cargaHorariaBody";
import React, { SetStateAction, useEffect, useState } from "react";
import ICargaHoraria, { cargaHorariaDefault } from "../../model/cargaHoraria";
import { IConfiguracao } from "../../model/configuracao";
import API from "../../API";

interface ListaDiasDaSemana {
  titulo: string;
  value: any;
  set: React.Dispatch<SetStateAction<any>>;
}

export default function AgendaConfiguracoesHome() {
  const [domingo, setDomingo] = useState<ICargaHoraria>(cargaHorariaDefault);
  const [segunda, setSegunda] = useState<ICargaHoraria>(cargaHorariaDefault);
  const [terca, setTerca] = useState<ICargaHoraria>(cargaHorariaDefault);
  const [quarta, setQuarta] = useState<ICargaHoraria>(cargaHorariaDefault);
  const [quinta, setQuinta] = useState<ICargaHoraria>(cargaHorariaDefault);
  const [sexta, setSexta] = useState<ICargaHoraria>(cargaHorariaDefault);
  const [sabado, setSabado] = useState<ICargaHoraria>(cargaHorariaDefault);
  const [horarioPadrao, setHorarioPadrao] = useState<boolean>(false);

  const optionsDiasDaSemana: ListaDiasDaSemana[] = [
    { titulo: "Domingo", value: domingo, set: setDomingo },
    { titulo: "Segunda Feira", value: segunda, set: setSegunda },
    { titulo: "Terça Feira", value: terca, set: setTerca },
    { titulo: "Quarta Feira", value: quarta, set: setQuarta },
    { titulo: "Quinta Feira", value: quinta, set: setQuinta },
    { titulo: "Sexta feira", value: sexta, set: setSexta },
    { titulo: "Sabado", value: sabado, set: setSabado },
  ];

  useEffect(() => {
    setDomingo({ ...domingo, diaDaSemana: "DOMINGO" });
    setSegunda({ ...segunda, diaDaSemana: "SEGUNDA" });
    setTerca({ ...terca, diaDaSemana: "TERCA" });
    setQuarta({ ...quarta, diaDaSemana: "QUARTA" });
    setQuinta({ ...quinta, diaDaSemana: "QUINTA" });
    setSexta({ ...sexta, diaDaSemana: "SEXTA" });
    setSabado({ ...sabado, diaDaSemana: "SABADO" });
  }, []);

  const toast = useToast();

  function onSave() {
    const dto: IConfiguracao = {
      cargaHoraria: [domingo, segunda, terca, quarta, quinta, sexta, sabado],
      horarioPadrao: horarioPadrao,
    };

    API.post("/configuracao", dto)
      .then((response) =>
        toast({
          duration: 3000,
          colorScheme: "green",
          description: "Configuração Salva com sucesso",
        })
      )
      .catch((response) => {
        toast({
          duration: 3000,
          colorScheme: "red",
          description: "Falha ao salvar Configuração",
        });
      });
  }

  useEffect(() => {
    API.get<IConfiguracao>("/configuracao").then((response) => {
      response.data.cargaHoraria.forEach((carga) => {
        if (carga.diaDaSemana === "SEGUNDA") {
          setSegunda(carga);
        } else if (carga.diaDaSemana === "TERCA") {
          setTerca(carga);
        } else if (carga.diaDaSemana === "QUARTA") {
          setQuarta(carga);
        } else if (carga.diaDaSemana === "QUINTA") {
          setQuinta(carga);
        } else if (carga.diaDaSemana === "SEXTA") {
          setSexta(carga);
        } else if (carga.diaDaSemana === "SABADO") {
          setSabado(carga);
        } else if (carga.diaDaSemana === "DOMINGO") {
          setDomingo(carga);
        }
      });
      setHorarioPadrao(response.data.horarioPadrao);
    });
  }, []);
  return (
    <>
      <Center>
        <Box border={"1px"} w={"container.xl"} mt={"16"} borderRadius={"base"}>
          <Box p={"5"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box></Box>
              <Heading textAlign={"center"} my={"5"}>
                Configurações
              </Heading>
              <Button colorScheme="green" onClick={onSave}>
                Salvar
              </Button>
            </Box>
            <Divider my={"2"} />
            <Center>
              <Box>
                <Text
                  fontWeight={"bold"}
                  fontSize={"large"}
                  textAlign={"center"}
                >
                  Carga horaria/Jornada de trabalho
                </Text>
                <Center>
                  <Checkbox
                    onChange={(e) => setHorarioPadrao(e.target.checked)}
                    isChecked={horarioPadrao}
                  >
                    Horario padrão 8hr-16hrs
                  </Checkbox>
                </Center>

                <Box mt={"5"}>
                  <SimpleGrid spacing={4} columns={7}>
                    {optionsDiasDaSemana.map((dia) => (
                      <Card>
                        <CardHeader>
                          <Heading size="sm"> {dia.titulo}</Heading>
                        </CardHeader>
                        <CardBody>
                          <CargaHorariaBody set={dia.set} value={dia.value} />
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </Box>
              </Box>
            </Center>
          </Box>
        </Box>
      </Center>
    </>
  );
}
