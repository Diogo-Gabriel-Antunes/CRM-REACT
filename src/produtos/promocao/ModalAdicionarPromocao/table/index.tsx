import {
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { SetStateAction } from "react";
import { ListPromocao } from "..";
import { ItensPromocao } from "../../../../model/promocao";

interface Props {
  list: ListPromocao[];
  listForApi: ItensPromocao[];
  setList: React.Dispatch<SetStateAction<ListPromocao[]>>;
  setListForApi: React.Dispatch<SetStateAction<ItensPromocao[]>>;
}

export default function TablePromocao({
  list,
  setList,
  listForApi,
  setListForApi,
}: Props) {
  const listHead = ["Nome Produto", "Quantidade"];

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              {listHead.map((option) => (
                <>
                  <Th>{option}</Th>
                </>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {list.map((object, index) => (
              <>
                <Tr>
                  <Td>{object?.nomeProduto}</Td>
                  <Td>{object?.quantidade}</Td>
                  <Td>
                    <IconButton
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      aria-label="Exlcuir"
                      onClick={(e) => {
                        const listFiltred = list.filter(
                          (option) => option.uuid !== object.uuid
                        );
                        const listForApiFiltred = listForApi.filter(
                          (option) => option.uuid !== object.uuid
                        );
                        setList(listFiltred);
                        setListForApi(listForApiFiltred);
                      }}
                    />
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              {listHead.map((option) => (
                <>
                  <Th>{option}</Th>
                </>
              ))}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}
