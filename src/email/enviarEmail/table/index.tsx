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
import { ListEmails, ListForAPI } from "..";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { SetStateAction } from "react";

interface Props {
  list: ListEmails[];
  listForApi: ListForAPI[];
  setList: React.Dispatch<SetStateAction<ListEmails[]>>;
  setListForApi: React.Dispatch<SetStateAction<ListForAPI[]>>;
}

export default function TableEnviarEmail({
  list,
  setList,
  listForApi,
  setListForApi,
}: Props) {
  const listHead = ["Configuração", "Template", "Cliente", "Excluir"];

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
                  <Td>{object?.enviante}</Td>
                  <Td>{object?.configuracaoNome}</Td>
                  <Td>{object?.templateNome}</Td>
                  <Td>{object?.clienteNome}</Td>
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
