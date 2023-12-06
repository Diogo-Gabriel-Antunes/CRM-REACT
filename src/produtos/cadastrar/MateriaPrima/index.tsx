import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { IMateriaPrima } from "../../../model/materiaPrima";
import { TableComponent, TableOptions } from "../../../components/table";
import API from "../../../API";
import ModalAdicionarProduto from "../modalAdicionar";
import ModalAdicionarMateriaPrima from "./ModalAdicionarMateriaPrima";

export default function MateriaPrimaCadastrarHome() {
  const toast = useToast();
  const [uuid, setUuid] = useState("");
  const [materiaPrima, setMateriaPrima] = useState<IMateriaPrima[]>([]);
  const [pagina, setPagina] = useState(0);

  const getMateriaPrima = () => {
    API.get(`/materia-prima?offset=${pagina}&limit=20`).then(
      (response: any) => {
        setMateriaPrima(response.data);
      }
    );
  };
  useEffect(() => {
    getMateriaPrima();
  }, [pagina]);
  const tableStructere: TableOptions = {
    data: materiaPrima,
    headers: ["Nome", "Quantidade Em Estoque"],
    options: [
      {
        headerOption: "Nome",
        listOption: "nome",
      },
      {
        headerOption: "Quantidade Em Estoque",
        listOption: "quantidadeEstoque",
      },
    ],
    title: "Materia Prima",
  };
  return (
    <>
      <Box>
        <Box display={"flex"} w={"full"} mt="10">
          <Box m={"auto"} p={"6"} border={"1px"} borderRadius={"base"}>
            <Box
              my={"3"}
              display={"flex"}
              justifyContent={"space-between"}
              w={"full"}
            >
              <Box>
                <Box>
                  <ModalAdicionarMateriaPrima refresh={getMateriaPrima} />
                  <ModalAdicionarMateriaPrima
                    editar
                    uuid={uuid}
                    refresh={getMateriaPrima}
                  />
                  <Button
                    mr={"5"}
                    colorScheme="red"
                    variant={"outline"}
                    onClick={() => {
                      if (uuid) {
                        API.delete("/produto/" + uuid).then((response: any) => {
                          toast({
                            duration: 3000,
                            colorScheme: "green",
                            description: "Produto deletado com sucesso",
                          });
                          getMateriaPrima();
                        });
                      }
                    }}
                  >
                    Excluir
                  </Button>
                  .
                </Box>
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
                refresh={getMateriaPrima}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
