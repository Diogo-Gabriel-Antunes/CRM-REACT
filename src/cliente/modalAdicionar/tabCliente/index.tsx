import {
  Box,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ClienteContext } from "../../../context/clienteContext";
import { ICliente } from "../../../model/Cliente";
import API from "../../../API";
import ISelect from "../../../model/select";

interface Props {
  editar?: boolean;
}

export default function TabCliente({ editar }: Props) {
  const { cliente, setCliente, agendamento, setAgendamento } =
    useContext(ClienteContext);
  const [funilSelect, setFunilSelect] = useState<ISelect[]>([]);
  const [fonteSelect, setFonteSelect] = useState<ISelect[]>([]);
  const [etapaFunilSelect, setEtapaFunilSelect] = useState<ISelect[]>([]);
  useEffect(() => {
    API.get<ISelect[]>("/funil/select").then((response) => {
      setFunilSelect(response.data);
    });

    API.get<ISelect[]>("/fonte/select").then((response) => {
      setFonteSelect(response.data);
    });
  }, []);

  useEffect(() => {
    if (agendamento.funilUuid) {
      API.get<ISelect[]>(
        "/etapa-funil/select?funilUuid=" + agendamento.funilUuid
      ).then((response) => {
        setEtapaFunilSelect(response.data);
      });
    } else {
      API.get<ISelect[]>("/etapa-funil/select").then((response) => {
        setEtapaFunilSelect(response.data);
      });
    }
  }, [agendamento.funilUuid]);
  return (
    <Tabs>
      <TabList>
        <Tab>Informações gerais</Tab>
        <Tab>Endereço</Tab>
        <Tab>Contato</Tab>
        {!editar && <Tab>Agendamento</Tab>}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box display={"flex"} p={"5"}>
            <Box mr={"5"}>
              <Input
                placeholder="Nome"
                value={cliente?.nome}
                onChange={(e) =>
                  setCliente({ ...cliente, nome: e.target.value })
                }
              />
              <Input
                my={"2"}
                placeholder="Sobrenome"
                value={cliente?.sobrenome}
                onChange={(e) =>
                  setCliente({ ...cliente, sobrenome: e.target.value })
                }
              />
              <Input
                placeholder="Min Faturamento"
                value={cliente?.minFaturamento}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    minFaturamento: parseInt(e.target.value),
                  })
                }
              />
              <Input
                my={"2"}
                placeholder="Max Faturamento"
                value={cliente?.maxFaturamento}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    maxFaturamento: parseInt(e.target.value),
                  })
                }
              />
            </Box>
            <Box>
              <Input
                placeholder="Cargo"
                value={cliente?.cargo}
                onChange={(e) =>
                  setCliente({ ...cliente, cargo: e.target.value })
                }
              />
              <Input
                my={"2"}
                placeholder="Setor"
                value={cliente?.setor}
                onChange={(e) =>
                  setCliente({ ...cliente, setor: e.target.value })
                }
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box display={"flex"} p={"5"}>
            <Box mr={"5"}>
              <Input
                placeholder="Logradouro"
                value={cliente?.endereco?.logradouro}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    endereco: {
                      ...cliente.endereco,
                      logradouro: e.target.value,
                    },
                  })
                }
              />
              <Input
                my={"2"}
                placeholder="Pais"
                value={cliente?.endereco?.pais}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    endereco: { ...cliente.endereco, pais: e.target.value },
                  })
                }
              />
              <Input
                placeholder="CEP"
                value={cliente?.endereco?.cep}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    endereco: { ...cliente.endereco, cep: e.target.value },
                  })
                }
              />
            </Box>
            <Box>
              <Input
                placeholder="Cidade"
                value={cliente?.endereco?.cidade}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    endereco: { ...cliente.endereco, cidade: e.target.value },
                  })
                }
              />
              <Input
                my={"2"}
                placeholder="Estado"
                value={cliente?.endereco?.estado}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    endereco: { ...cliente.endereco, estado: e.target.value },
                  })
                }
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box display={"flex"} p={"5"}>
            <Box mr={"5"}>
              <Input
                placeholder="Telefone"
                value={cliente?.contato?.telefone}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    contato: { ...cliente.contato, telefone: e.target.value },
                  })
                }
              />
              <Input
                my={"2"}
                placeholder="Telefone 2"
                value={cliente?.contato?.telefone2}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    contato: { ...cliente.contato, telefone2: e.target.value },
                  })
                }
              />
            </Box>
            <Box>
              <Input
                placeholder="E-mail"
                value={cliente?.contato?.email}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    contato: { ...cliente.contato, email: e.target.value },
                  })
                }
              />
            </Box>
          </Box>
        </TabPanel>
        {!editar && (
          <TabPanel>
            <Box display={"flex"} p={"5"}>
              <Box mr={"5"}>
                <Input
                  type="datetime-local"
                  value={agendamento.dataAgendamento}
                  onChange={(e) =>
                    setAgendamento({
                      ...agendamento,
                      dataAgendamento: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <Select
                  placeholder="Tipo agendamento"
                  value={agendamento.tipoAgendamento}
                  onChange={(e) =>
                    setAgendamento({
                      ...agendamento,
                      tipoAgendamento: e.target.value,
                    })
                  }
                >
                  <option value="OPORTUNIDADE">Oportunidade</option>
                  <option value="TAREFA">Tarefa</option>
                </Select>
                {agendamento.tipoAgendamento === "OPORTUNIDADE" && (
                  <>
                    <Select
                      placeholder="Funil"
                      value={agendamento.funilUuid}
                      onChange={(e) =>
                        setAgendamento({
                          ...agendamento,
                          funilUuid: e.target.value,
                        })
                      }
                      my={"5"}
                    >
                      {funilSelect.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Select>
                    <Select
                      placeholder="Etapa do Funil"
                      value={agendamento.etapaDoFunilUuid}
                      onChange={(e) =>
                        setAgendamento({
                          ...agendamento,
                          etapaDoFunilUuid: e.target.value,
                        })
                      }
                    >
                      {etapaFunilSelect?.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Select>
                    <Select
                      my={"5"}
                      placeholder="Fonte"
                      value={agendamento.etapaDoFunilUuid}
                      onChange={(e) =>
                        setAgendamento({
                          ...agendamento,
                          etapaDoFunilUuid: e.target.value,
                        })
                      }
                    >
                      {fonteSelect?.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Select>
                    <Input
                      type="number"
                      placeholder="Valor"
                      value={agendamento.valor}
                      onChange={(e) =>
                        setAgendamento({
                          ...agendamento,
                          valor: Number(e.target.value),
                        })
                      }
                    />
                  </>
                )}
              </Box>
            </Box>
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
}
