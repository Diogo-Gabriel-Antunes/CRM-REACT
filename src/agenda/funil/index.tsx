import { useEffect, useState } from "react";
import API from "../../API";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import AccordionCompromisso from "./panel";
export interface Compromisso {
  uuid: string;
  inicioCompromisso: string;
  fimCompromisso: string;
  diaDaSemana: string;
  mes: string;
  horario: string;
  tipoCompromisso: string;
  diaDoMes: string;
}

export interface CalendarioHorarios {
  compromisso: Compromisso;
  horario: string;
}

export interface Dias {
  calendarioHorarios: CalendarioHorarios[];
  diaDoMes: string;
}
export interface Calendario {
  dias: Dias[];
  mes: string;
}
export default function AgendaFunilHome() {
  const [calendario, setCalendario] = useState<Calendario>();
  function getAgenda() {
    API.get<Calendario>("/agenda").then((response) => {
      setCalendario(response.data);
    });
  }
  useEffect(() => {
    getAgenda();
  }, []);
  return (
    <>
      <Card>
        <CardBody>
          <Grid templateColumns="repeat(7, 1fr)" gap={1}>
            {calendario?.dias?.map((dia, index) => (
              <Card>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Center>
                        <Heading>Dia {index + 1}</Heading>
                      </Center>
                      {dia.calendarioHorarios.map((horario) => (
                        <>
                          {horario.horario == "H01" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="1 Hora"
                            />
                          )}
                          {horario.horario == "H02" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="2 Hora"
                            />
                          )}
                          {horario.horario == "H03" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="3 Hora"
                            />
                          )}
                          {horario.horario == "H04" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="4 Hora"
                            />
                          )}
                          {horario.horario == "H05" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="5 Hora"
                            />
                          )}
                          {horario.horario == "H06" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="6 Hora"
                            />
                          )}
                          {horario.horario == "H07" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="7 Hora"
                            />
                          )}
                          {horario.horario == "H08" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="8 Hora"
                            />
                          )}
                          {horario.horario == "H09" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="9 Hora"
                            />
                          )}
                          {horario.horario == "H10" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="10 Hora"
                            />
                          )}
                          {horario.horario == "H11" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="11 Hora"
                            />
                          )}
                          {horario.horario == "H12" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="12 Hora"
                            />
                          )}
                          {horario.horario == "H13" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="13 Hora"
                            />
                          )}
                          {horario.horario == "H14" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="14 Hora"
                            />
                          )}
                          {horario.horario == "H15" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="15 Hora"
                            />
                          )}
                          {horario.horario == "H16" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="16 Hora"
                            />
                          )}
                          {horario.horario == "H17" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="17 Hora"
                            />
                          )}
                          {horario.horario == "H18" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="18 Hora"
                            />
                          )}
                          {horario.horario == "H19" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="19 Hora"
                            />
                          )}
                          {horario.horario == "H20" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="20 Hora"
                            />
                          )}
                          {horario.horario == "H21" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="21 Hora"
                            />
                          )}
                          {horario.horario == "H22" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="22 Hora"
                            />
                          )}
                          {horario.horario == "H23" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="23 Hora"
                            />
                          )}
                          {horario.horario == "H24" && (
                            <AccordionCompromisso
                              compromisso={horario.compromisso}
                              title="24 Hora"
                            />
                          )}
                        </>
                      ))}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </CardBody>
      </Card>
    </>
  );
}
