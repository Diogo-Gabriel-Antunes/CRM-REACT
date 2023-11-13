import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { TableComponent, TableOptions } from "../../components/table";
import { useEffect, useState } from "react";
import API from "../../API";
import ModalAdicionarFunil from "./modalAdicionar";
import ModalEtapas from "./modalEtapas";
import IFunil from "../../model/funil";
import { create } from "domain";

export function createTableStructureFunil(data: IFunil[]) {
  return {
    data: data,
    headers: [
      "Nome",
      "Qtd  de integrações",
      "Ativo",
      "Qtd Etapas",
      "Campanha",
      "Padrão",
    ],
    options: [
      { headerOption: "Nome", listOption: "nomeFunil" },
      { headerOption: "Qtd  de integrações", listOption: "qtdIntegracoes" },
      { headerOption: "Ativo", listOption: "ativo" },
      { headerOption: "Qtd Etapas", listOption: "quantidadeEtapas" },
      { headerOption: "Campanha", listOption: "nomeCampanha" },
      { headerOption: "Padrão", listOption: "padrao" },
    ],
    title: "Funis",
  };
}

export default function FunilHome() {
  const [uuid, setUuid] = useState("");
  const [pagina, setPagina] = useState(0);
  const [funis, setFunis] = useState<IFunil[]>([]);
  const toast = useToast();
  const tableStructere: TableOptions = createTableStructureFunil(funis);

  function excluir() {
    if (uuid) {
      API.delete(`/funil/${uuid}`).then((response) => {
        getFunil();
        toast({
          colorScheme: "green",
          duration: 3000,
          description: "Deletado com sucesso",
        });
      });
    } else {
      toast({
        colorScheme: "red",
        duration: 3000,
        description: "É necessario selecionar uma funil",
      });
    }
  }

  function getFunil(ativo?: boolean) {
    if (ativo) {
      API.get(`/funil?offset=${pagina}&soAtivo=true`).then((response) => {
        setFunis(response.data);
      });
    } else {
      API.get("/funil?offset=" + pagina).then((response) => {
        setFunis(response.data);
        console.log(response.data);
      });
    }
  }
  useEffect(() => {
    getFunil();
  }, []);
  return (
    <>
      <Box>
        <Box display={"flex"} w={"full"} mt="10">
          <Box m={"auto"} p={"6"} border={"1px"} borderRadius={"base"}>
            <Box my={"3"} display={"flex"} justifyContent={"space-between"}>
              <Box>
                <ModalAdicionarFunil />
                <ModalAdicionarFunil editar uuid={uuid} />
                <Button
                  colorScheme="red"
                  variant={"outline"}
                  mr={"6"}
                  onClick={excluir}
                >
                  Excluir
                </Button>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Mais ações
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <ModalEtapas uuid={uuid} />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box mr={"5"}>
                  <Checkbox
                    colorScheme="green"
                    onChange={(e) => {
                      if (e.target.checked) {
                        getFunil(true);
                      } else {
                        getFunil();
                      }
                    }}
                  >
                    Apenas ativo
                  </Checkbox>
                </Box>
                <Box>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                    />
                    <Input placeholder="Pesquisar funil" />
                    <InputRightElement>
                      <Search2Icon color="green.500" />
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </Box>
            </Box>

            <Box w={"container.xl"} height={"container.sm"} overflowY={"auto"}>
              <TableComponent
                props={tableStructere}
                uuid={uuid}
                setUuid={setUuid}
                pagina={pagina}
                setPagina={setPagina}
                refresh={getFunil}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
