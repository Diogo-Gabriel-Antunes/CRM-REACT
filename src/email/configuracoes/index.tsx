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
import { TableComponent } from "../../components/table";
import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalAdicionarTemplate from "../cadastrar/ModalAdicionarTemplate";
import {
  IConfiguracaoEmail,
  createTableStructureConfiguracaoEmail,
} from "../../model/configuracaoEmail";

export default function ConfiguracoesEmailHome() {
  const toast = useToast();
  const [uuid, setUuid] = useState("");
  const [configuracoes, setConfiguracoes] = useState<IConfiguracaoEmail[]>([]);
  const [pagina, setPagina] = useState(0);

  const getConfiguracoes = () => {
    axios.get(`http://localhost:8081/configuracao-email`).then((response) => {
      setConfiguracoes(response.data);
    });
  };
  useEffect(() => {
    getConfiguracoes();
  }, [pagina]);
  const tableStructere = createTableStructureConfiguracaoEmail(configuracoes);
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
                  <ModalAdicionarTemplate refresh={getConfiguracoes} />
                  <ModalAdicionarTemplate
                    editar
                    uuid={uuid}
                    refresh={getConfiguracoes}
                  />

                  <Button
                    mr={"5"}
                    colorScheme="red"
                    variant={"outline"}
                    onClick={() => {
                      if (uuid) {
                        axios
                          .delete(
                            "http://localhost:8081/configuracao-email/" + uuid
                          )
                          .then((response) => {
                            toast({
                              duration: 3000,
                              colorScheme: "green",
                              description: "Template deletado com sucesso",
                            });
                            getConfiguracoes();
                          });
                      }
                    }}
                  >
                    Excluir
                  </Button>
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
                refresh={getConfiguracoes}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
