import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useCheckboxGroup,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import API from "../../../API";
import { AddIcon } from "@chakra-ui/icons";
import TabTarefa from "./tabTarefa";
import { Dia, Mes } from "../../../model/calendario";
import { stringify } from "querystring";
import ICompromisso, { compromissoDefault } from "../../../model/compromisso";
import ModalPesquisaClienteGeneric from "../../../components/modalCliente";
import { ICliente, clienteDefault } from "../../../model/Cliente";
import { setuid } from "process";
import ISelect from "../../../model/select";
import SelectPadrao from "../../../components/select";
import TabOportunidade from "./tabOportunidade";

interface Props {
  dia: string;
  mes: string;
}

export default function ModalAdicionarCompromisso({ dia, mes }: Props) {
  const [compromisso, setCompromisso] =
    useState<ICompromisso>(compromissoDefault);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nome, setNome] = useState("");
  const toast = useToast();
  const [dataSelecionada, setDataSelecionada] = useState<string>();
  const [horariosSelect, setHorariosSelect] = useState<ISelect[]>([]);

  function openModal() {
    onOpen();

    const mesQuery = Mes[mes as keyof typeof Mes];
    const diaQuery = Dia[dia as keyof typeof Dia];
    setDataSelecionada(
      `2023-${mesQuery <= 9 ? "0" + mesQuery : mesQuery}-${
        diaQuery <= 9 ? "0" + diaQuery : diaQuery
      }`
    );
    setCompromisso({
      ...compromisso,
      mes: mes,
      diaDoMes: dia,
      tarefas: {
        ...compromisso.tarefas,
        horaMarcada: new Date(2023, mesQuery, diaQuery),
      },
    });
  }
  const [clienteSelecionado, setClienteSelecionado] =
    useState<ICliente>(clienteDefault);
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    if (uuid !== "") {
      API.get(`/cliente/${uuid}`).then((response) =>
        setClienteSelecionado(response.data)
      );
    }
    API.get<ISelect[]>("/configuracao/jornada-de-trabalho/select").then(
      (response) => {
        setHorariosSelect(response.data);
      }
    );
  }, [uuid]);
  return (
    <>
      <IconButton
        ml={"4"}
        variant="outline"
        colorScheme="teal"
        aria-label="Adicionar"
        fontSize="12px"
        icon={<AddIcon />}
        onClick={openModal}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criação de compromisso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  placeholder="Cliente"
                  value={clienteSelecionado.nome}
                  disabled
                />
                <InputRightElement width="4.5rem">
                  <ModalPesquisaClienteGeneric setUuid={setUuid} uuid={uuid} />
                </InputRightElement>
              </InputGroup>
              <Box my={"5"}>
                <FormLabel fontWeight={"bold"}>
                  Inicio do compromisso Representação
                </FormLabel>
                <Input
                  type="datetime-local"
                  onChange={(e) => {
                    setCompromisso({
                      ...compromisso,
                      inicioCompromisso: e.target.value,
                    });
                  }}
                />
              </Box>
              <Box>
                <FormLabel fontWeight={"bold"}>
                  Fim do compromisso Representação
                </FormLabel>
                <Input
                  type="datetime-local"
                  onChange={(e) => {
                    setCompromisso({
                      ...compromisso,
                      fimCompromisso: e.target.value,
                    });
                  }}
                />
              </Box>
              <Box my="5">
                <SelectPadrao
                  placeHolder="Horario marcação"
                  onChange={(e) =>
                    setCompromisso({ ...compromisso, horario: e.target.value })
                  }
                  options={horariosSelect}
                  value={compromisso.horario}
                />
              </Box>
              <Tabs>
                <TabList>
                  <Tab>Tarefa</Tab>
                  <Tab>Oportunidade</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <TabTarefa
                      data={dataSelecionada!}
                      compromisso={compromisso}
                      setCompromisso={setCompromisso}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TabOportunidade
                      data={dataSelecionada!}
                      compromisso={compromisso}
                      setCompromisso={setCompromisso}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
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
