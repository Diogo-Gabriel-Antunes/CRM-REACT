import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  IconButton,
  Input,
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

interface Props {
  dia: string;
  mes: string;
}

export default function ModalAdicionarCompromisso({ dia, mes }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nome, setNome] = useState("");
  const toast = useToast();
  const [dataSelecionada, setDataSelecionada] = useState<string>();

  function openModal() {
    onOpen();
    const mesQuery = Mes[mes as keyof typeof Mes];
    const diaQuery = Dia[dia as keyof typeof Dia];
    setDataSelecionada(
      `2023-${mesQuery <= 9 ? "0" + mesQuery : mesQuery}-${
        diaQuery <= 9 ? "0" + diaQuery : diaQuery
      }`
    );
  }

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
              <Tabs>
                <TabList>
                  <Tab>Tarefa</Tab>
                  <Tab>Oportunidade</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <TabTarefa data={dataSelecionada!} />
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button variant="ghost">Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
