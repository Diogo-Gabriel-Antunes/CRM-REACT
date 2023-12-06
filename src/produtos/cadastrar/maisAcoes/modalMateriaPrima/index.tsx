import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import API from "../../../../API";
import { useEffect, useState } from "react";
import { TableComponent, TableOptions } from "../../../../components/table";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import { IMateriaPrima } from "../../../../model/materiaPrima";
import { ItensMateriaPrima } from "../../../../model/ItensMateriaPrima";

interface Props {
  produtoUuid: string;
}

export default function ModalMateriaPrima({ produtoUuid }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagina, setPagina] = useState(0);
  const [paginaItens, setPaginaItens] = useState(0);
  const [materiaPrima, setMateriaPrima] = useState([]);
  const [itensMateriaPrima, setItensMateriaPrima] = useState([]);
  const [uuidMateriaPrima, setUuidMateriaPrima] = useState("");
  const [uuidItensMateriaPrima, setUuidItensMateriaPrima] = useState("");
  const [materiaPrimaSelecionada, setMateriaPrimaSelecionada] =
    useState<IMateriaPrima>();
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const toast = useToast();
  function getMateriaPrima() {
    API.get(`/materia-prima?offset=${pagina}&limit=5`).then((response) =>
      setMateriaPrima(response.data)
    );
  }

  function pesquisar() {
    API.get(`/materia-prima?limit=5&nome=${nome}`).then((response) =>
      setMateriaPrima(response.data)
    );
  }

  function addItensMateriaPrima() {
    var dto = {} as ItensMateriaPrima;
    if (materiaPrimaSelecionada) {
      dto.materiaPrimas = materiaPrimaSelecionada;
    } else {
      toast({
        colorScheme: "red",
        description: "Selecione uma materia prima",
        duration: 3000,
      });
    }

    if (quantidade !== 0) {
      dto.quantidadeUtiliza = quantidade;
    } else {
      toast({
        colorScheme: "red",
        description: "Insira uma quantidade maior do que 0",
        duration: 3000,
      });
    }

    API.post("/produto/itens/" + produtoUuid, dto).then((response) => {
      console.log(response.data);
      getItensMateriaPrima();
    });
  }

  function getItensMateriaPrima() {
    API.get(`/produto/materia-prima/${produtoUuid}`).then((response) => {
      console.log(response.data);
      setItensMateriaPrima(response.data);
    });
  }
  const tableStructure: TableOptions = {
    data: materiaPrima,
    headers: ["Nome", "Quantidade Estoque"],
    options: [
      {
        headerOption: "Nome",
        listOption: "nome",
      },
      { headerOption: "Quantidade Estoque", listOption: "quantidadeEstoque" },
    ],
    title: "Materias Prima",
  };
  const tableStructureItensMateriaPrima: TableOptions = {
    data: itensMateriaPrima,
    headers: ["Nome", "Quantidade Que Utiliza"],
    options: [
      {
        headerOption: "Nome",
        listOption: "nome",
      },
      {
        headerOption: "Quantidade Que Utiliza",
        listOption: "quantidadeUtiliza",
      },
    ],
    title: "Itens Materias Prima",
  };
  useEffect(() => {
    getMateriaPrima();
  }, [pagina]);

  useEffect(() => {
    if (produtoUuid !== "") {
      getItensMateriaPrima();
    }
  }, [produtoUuid]);
  useEffect(() => {
    if (uuidMateriaPrima !== "") {
      API.get(`/materia-prima/${uuidMateriaPrima}`).then((response) =>
        setMateriaPrimaSelecionada(response.data)
      );
    }
  }, [uuidMateriaPrima]);

  return (
    <>
      <Box
        px={"2"}
        py={"1"}
        onClick={() => {
          if (produtoUuid) {
            onOpen();
          } else {
            toast({
              colorScheme: "red",
              duration: 3000,
              description: "Selecione um produto",
            });
          }
        }}
        _hover={{ bg: "gray.100" }}
      >
        Materia Prima
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Materia prima</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box>
                <Box>
                  <Box my={"5"}>
                    <InputGroup>
                      <Input
                        placeholder="Pesquisa Materia por nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                      <InputRightElement>
                        <Search2Icon color="green.500" onClick={pesquisar} />
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                  <Box>
                    <TableComponent
                      pagina={pagina}
                      props={tableStructure}
                      refresh={getMateriaPrima}
                      setPagina={setPagina}
                      setUuid={setUuidMateriaPrima}
                      uuid={uuidMateriaPrima}
                    />
                  </Box>
                </Box>
              </Box>
              <SimpleGrid columns={3} spacing={5} p={"3"}>
                <Box>
                  <Input
                    placeholder="Materia Selecionada"
                    disabled
                    value={materiaPrimaSelecionada?.nome}
                  />
                </Box>
                <Box>
                  <Input
                    type="number"
                    placeholder="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                  />
                </Box>
                <Box>
                  <IconButton
                    icon={<AddIcon />}
                    aria-label="addIcon"
                    colorScheme="green"
                    onClick={addItensMateriaPrima}
                  />
                </Box>
              </SimpleGrid>
              <Box my={"5"}>
                <TableComponent
                  pagina={paginaItens}
                  props={tableStructureItensMateriaPrima}
                  refresh={getItensMateriaPrima}
                  setPagina={setPaginaItens}
                  setUuid={setUuidItensMateriaPrima}
                  uuid={uuidItensMateriaPrima}
                />
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>

            <Button variant="solid" colorScheme="green">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
