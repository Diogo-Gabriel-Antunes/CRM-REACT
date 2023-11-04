import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import API from "../API";
import { TableComponent, TableOptions } from "../components/table";
import { Search2Icon } from "@chakra-ui/icons";
import ModalAdicionarCliente from "./modalAdicionar";
import { setuid } from "process";
import { tab } from "@testing-library/user-event/dist/tab";
import { ICliente } from "../model/Cliente";

export const clienteTableStructure = (clientes: ICliente[]) => {
  const tableStructere: TableOptions = {
    data: clientes!,
    headers: ["Nome", "Sobrenome", "Min Faturamento", "Max Faturamento"],
    title: "Clientes",
    options: [
      {
        headerOption: "Nome",
        listOption: "nome",
      },
      {
        headerOption: "SobreNome",
        listOption: "sobrenome",
      },
      {
        headerOption: "Min Faturamento",
        listOption: "minFaturamento",
      },
      {
        headerOption: "Max Faturamento",
        listOption: "maxFaturamento",
      },
    ],
  };

  return tableStructere;
};

export default function ClienteHome() {
  const toast = useToast();
  const [uuid, setUuid] = useState("");
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [pagina, setPagina] = useState(0);

  const getClientes = () => {
    API.get(`/cliente?offset=${pagina}`).then((response) => {
      setClientes(response.data);
    });
  };
  useEffect(() => {
    getClientes();
  }, [pagina]);
  const tableStructere = clienteTableStructure(clientes!);
  return (
    <>
      <Box>
        <Box display={"flex"} w={"full"} mt="10">
          <Box m={"auto"} p={"6"} border={"1px"} borderRadius={"base"}>
            <Box my={"3"} display={"flex"} justifyContent={"space-between"}>
              <Box>
                <ModalAdicionarCliente setClientes={setClientes} />
                <ModalAdicionarCliente
                  uuid={uuid}
                  editar
                  setClientes={setClientes}
                />
                <Button
                  colorScheme="red"
                  variant={"outline"}
                  onClick={() => {
                    if (uuid) {
                      API.delete("/cliente/" + uuid).then((response) => {
                        toast({
                          duration: 3000,
                          colorScheme: "green",
                          description: "Cliente deletado com sucesso",
                        });
                        getClientes();
                      });
                    }
                  }}
                >
                  Excluir
                </Button>
              </Box>
              <Box>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                  />
                  <Input placeholder="Pesquisar Cliente" />
                  <InputRightElement>
                    <Search2Icon color="green.500" />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Box>

            <Box w={"container.xl"} height={"container.sm"} overflowY={"auto"}>
              <TableComponent
                props={tableStructere}
                uuid={uuid}
                setUuid={setUuid}
                pagina={pagina}
                setPagina={setPagina}
                refresh={getClientes}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
