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
import API from "../../API";
import { IProduto, createTableStructureProduto } from "../../model/produto";
import ModalAdicionarProduto from "./modalAdicionar";
import ModalMateriaPrima from "./maisAcoes/modalMateriaPrima";

export default function ProdutoCadastrarHome() {
  const toast = useToast();
  const [uuid, setUuid] = useState("");
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [pagina, setPagina] = useState(0);

  const getProdutos = () => {
    API.get(`/produto?offset=${pagina}`).then((response) => {
      setProdutos(response.data);
    });
  };
  useEffect(() => {
    getProdutos();
  }, [pagina]);
  const tableStructere = createTableStructureProduto(produtos);
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
                  <ModalAdicionarProduto refresh={getProdutos} />
                  <ModalAdicionarProduto
                    editar
                    uuid={uuid}
                    refresh={getProdutos}
                  />
                  <Button
                    mr={"5"}
                    colorScheme="red"
                    variant={"outline"}
                    onClick={() => {
                      if (uuid) {
                        API.delete("/produto/" + uuid).then((response) => {
                          toast({
                            duration: 3000,
                            colorScheme: "green",
                            description: "Produto deletado com sucesso",
                          });
                          getProdutos();
                        });
                      }
                    }}
                  >
                    Excluir
                  </Button>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Mais ações
                    </MenuButton>
                    <MenuList>
                      <MenuItem>
                        <ModalMateriaPrima produtoUuid={uuid} />
                      </MenuItem>
                    </MenuList>
                  </Menu>
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
                refresh={getProdutos}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
