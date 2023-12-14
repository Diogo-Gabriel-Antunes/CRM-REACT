import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { TableComponent } from "../../components/table";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import API from "../../API";
import ModalAdicionarPromocao from "./ModalAdicionarPromocao";
import { IPromocao, createTableStructurePromocao } from "../../model/promocao";

export default function PromocaoCadastrarHome() {
  const toast = useToast();
  const [uuid, setUuid] = useState("");
  const [promocao, setPromocao] = useState<IPromocao[]>([]);
  const [pagina, setPagina] = useState(0);

  const getPromocoes = () => {
    API.get(`/promocao?offset=${pagina}`).then((response) => {
      setPromocao(response.data);
    });
  };
  useEffect(() => {
    getPromocoes();
  }, [pagina]);
  const tableStructere = createTableStructurePromocao(promocao);
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
                  <ModalAdicionarPromocao refresh={getPromocoes} />
                  <ModalAdicionarPromocao
                    editar
                    uuid={uuid}
                    refresh={getPromocoes}
                  />
                  <Button
                    mr={"5"}
                    colorScheme="red"
                    variant={"outline"}
                    onClick={() => {
                      if (uuid) {
                        API.delete("/promocao/" + uuid).then((response) => {
                          toast({
                            duration: 3000,
                            colorScheme: "green",
                            description: "Produto deletado com sucesso",
                          });
                          getPromocoes();
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
                refresh={getPromocoes}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
