import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
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

interface Props {
  props: TableOptions;
  uuid: string;
  setUuid: React.Dispatch<React.SetStateAction<string>>;
  pagina: number;
  setPagina: React.Dispatch<React.SetStateAction<number>>;
  refresh: () => void;
}
export interface TableOptions {
  data: any[];
  headers: string[];
  options: options[];
  title: string;
}

interface options {
  listOption: string;
  type?: string;
  headerOption: string;
}

export function TableComponent({
  props,
  setUuid,
  uuid,
  pagina,
  setPagina,
  refresh,
}: Props) {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>{props.title}</TableCaption>
          <Thead>
            <Tr>
              {props?.headers?.map((header) => (
                <Th>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {props?.data?.map((object) => {
              return (
                <Tr
                  onClick={() => {
                    if (uuid === object.uuid) {
                      setUuid("");
                    } else {
                      setUuid(object.uuid);
                    }
                  }}
                  bg={uuid === object.uuid ? "blue.200" : "inherit"}
                >
                  {props?.options?.map((option) => (
                    <>
                      <Td>{object[option?.listOption]}</Td>
                    </>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              {props?.headers?.map((header) => (
                <Th>{header}</Th>
              ))}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box></Box>
        <Box display={"flex"} alignItems={"center"}>
          <Box>
            <Button
              variant={"ghost"}
              onClick={() => {
                setPagina(pagina - 1);
              }}
            >
              <ChevronLeftIcon />
            </Button>
          </Box>
          <Box fontSize={"small"}>{pagina}</Box>
          <Box>
            <Button
              variant={"ghost"}
              onClick={() => {
                setPagina(pagina + 1);
              }}
            >
              <ChevronRightIcon />
            </Button>
          </Box>
          <Box>
            <Button
              variant={"ghost"}
              onClick={() => {
                refresh();
              }}
            >
              <RepeatIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
