import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  IconButton,
  Input,
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
import React, { useContext, useEffect, useState } from "react";
import { IProduto, produtoDefault } from "../../../model/produto";
import API from "../../../API";
import {
  IPromocao,
  ItensPromocao,
  promocaoDefault,
} from "../../../model/promocao";
import ModalPesquisaProdutoGeneric from "../../../components/modalProduto";
import { AddIcon } from "@chakra-ui/icons";
import TablePromocao from "./table";

interface Props {
  uuid?: string;
  editar?: boolean;
  refresh: () => void;
}

export interface ListPromocao {
  uuid: number;
  nomeProduto: string;
  quantidade: number;
}

export default function ModalAdicionarPromocao({
  uuid,
  editar,
  refresh,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [promocao, setPromocao] = useState<IPromocao>(promocaoDefault);
  const toast = useToast({
    duration: 3000,
  });
  const [produto, setProduto] = useState<IProduto>(produtoDefault);
  const [produtoUuid, setProdutoUuid] = useState("");
  const [quantidade, setQuantidade] = useState<number | undefined>();
  const [listForApi, setListForApi] = useState<ItensPromocao[]>([]);
  const [list, setList] = useState<ListPromocao[]>([]);
  const [uuidList, setUuidList] = useState(0);
  function add() {
    var dtoList: ListPromocao = {
      uuid: uuidList,
      nomeProduto: produto.nome,
      quantidade: quantidade!,
    };

    setList([...list, dtoList]);
    setPromocao({
      ...promocao,
      itensPromocaos: [
        ...promocao.itensPromocaos,
        { produtos: produto, quantidade: quantidade!, uuid: null },
      ],
    });
    setUuidList(uuidList + 1);
    setProduto(produtoDefault);
    setQuantidade(undefined);
  }

  function toastSave() {
    toast({
      colorScheme: "green",
      description: "Produto salvo com sucesso",
    });
  }

  function onSave() {
    if (uuid) {
      API.put(`/promocao/${uuid}`, promocao).then((response) => {
        toastSave();
        refresh();
      });
    } else {
      API.post("/promocao", promocao).then((response) => {
        toastSave();
        refresh();
      });
    }
  }

  useEffect(() => {
    if (produtoUuid !== "") {
      API.get(`/produto/${produtoUuid}`).then((response) =>
        setProduto(response.data)
      );
    }
  }, [produtoUuid]);

  return (
    <>
      <Button
        colorScheme="teal"
        variant={"outline"}
        mx={editar ? "6" : "0"}
        onClick={() => {
          if (editar) {
            if (!uuid) {
              return toast({
                colorScheme: "red",
                description: "Selecione um produto",
              });
              return;
            }
            API.get(`/promocao/${uuid}`).then((response) => {
              setPromocao(response.data);
            });
          }
          onOpen();
        }}
      >
        {editar ? "Editar" : "Adicionar"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={10}>
              <Box>
                <Input
                  placeholder="Nome"
                  value={promocao.nomePromocao}
                  onChange={(e) =>
                    setPromocao({ ...promocao, nomePromocao: e.target.value })
                  }
                />
              </Box>
              <Box>
                <Input
                  type="number"
                  placeholder="Preço"
                  value={promocao?.porcetagem.toString()}
                  onChange={(e) =>
                    setPromocao({
                      ...promocao,
                      porcetagem: Number(e.target.value),
                    })
                  }
                />
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={3} spacing={10} mt={"5"}>
              <Box>
                <ModalPesquisaProdutoGeneric
                  produto={produto}
                  setUuid={setProdutoUuid}
                  uuid={produtoUuid}
                />
              </Box>
              <Box>
                <Input
                  value={quantidade?.toString()}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                  placeholder="Quantidade"
                />
              </Box>
              <Box>
                <IconButton
                  aria-label="add"
                  icon={<AddIcon />}
                  colorScheme="green"
                  onClick={add}
                />
              </Box>
            </SimpleGrid>
            <Box mt={"5"}>
              <TablePromocao
                list={list}
                listForApi={listForApi}
                setList={setList}
                setListForApi={setListForApi}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>

            <Button variant="solid" colorScheme="green" onClick={onSave}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
