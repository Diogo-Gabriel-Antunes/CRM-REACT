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
import ModalAdicionarCampanha from "./modalAdicionar";
import ModalVincularFunil from "./modalVincularFunil";
import ICampanha, { createTableStructureCampanha } from "../../model/campanha";

export default function CampanhaHome() {
  const [uuid, setUuid] = useState("");
  const [pagina, setPagina] = useState(0);
  const [campanhas, setCampanhas] = useState<ICampanha[]>([]);
  const toast = useToast();
  const tableStructere: TableOptions = createTableStructureCampanha(campanhas);

  function excluir() {
    if (uuid) {
      API.delete(`/campanha/${uuid}`).then((response) => {
        getCampanha();
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

  function ativarDesativar() {
    if (uuid) {
      API.put(`/campanha/alterar-status/${uuid}`).then((response) => {
        getCampanha();
        toast({
          colorScheme: "green",
          duration: 3000,
          description: "Alterado status com sucesso",
        });
      });
    } else {
      toast({
        colorScheme: "red",
        duration: 3000,
        description: "É necessario selecionar uma campanha",
      });
    }
  }

  function getCampanha(ativo?: boolean) {
    if (ativo) {
      API.get(`/campanha?offset=${pagina}&soAtivo=true`).then((response) => {
        setCampanhas(response.data);
      });
    } else {
      API.get("/campanha?offset=" + pagina).then((response) => {
        setCampanhas(response.data);
      });
    }
  }
  useEffect(() => {
    getCampanha();
  }, []);
  return (
    <>
      <Box>
        <Box display={"flex"} w={"full"} mt="10">
          <Box m={"auto"} p={"6"} border={"1px"} borderRadius={"base"}>
            <Box my={"3"} display={"flex"} justifyContent={"space-between"}>
              <Box>
                <ModalAdicionarCampanha />
                <ModalAdicionarCampanha editar uuid={uuid} />
                <Button
                  colorScheme="teal"
                  variant={"outline"}
                  mr={"6"}
                  onClick={ativarDesativar}
                >
                  Ativar/Desativar
                </Button>
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
                  <MenuList px={"5"}>
                    <MenuItem>
                      <ModalVincularFunil uuid={uuid} />
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
                        getCampanha(true);
                      } else {
                        getCampanha();
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
                refresh={getCampanha}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
