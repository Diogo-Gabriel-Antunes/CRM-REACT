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
import { ITemplate, createTableStructureTemplate } from "../../model/template";
import axios from "axios";
import ModalAdicionarTemplate from "./ModalAdicionarTemplate";

export default function EmailCadastrarHome() {
  const toast = useToast();
  const [uuid, setUuid] = useState("");
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [pagina, setPagina] = useState(0);

  const getTemplates = () => {
    axios.get(`http://localhost:8081/template`).then((response) => {
      setTemplates(response.data);
    });
  };
  useEffect(() => {
    getTemplates();
  }, [pagina]);
  const tableStructere = createTableStructureTemplate(templates);
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
                  <ModalAdicionarTemplate refresh={getTemplates} />
                  <ModalAdicionarTemplate
                    editar
                    uuid={uuid}
                    refresh={getTemplates}
                  />
                  <Button
                    mr={"5"}
                    colorScheme="teal"
                    variant={"outline"}
                    onClick={() => {
                      if (uuid) {
                        axios
                          .put(
                            "http://localhost:8081/template/ativar-desativar/" +
                              uuid,
                            { nomeTemplate: "", template: "" }
                          )
                          .then((response) => {
                            toast({
                              duration: 3000,
                              colorScheme: "green",
                              description: "Template Atualizado com sucesso",
                            });
                            getTemplates();
                          });
                      }
                    }}
                  >
                    Ativar/Desativar
                  </Button>
                  <Button
                    mr={"5"}
                    colorScheme="red"
                    variant={"outline"}
                    onClick={() => {
                      if (uuid) {
                        axios
                          .delete("http://localhost:8081/template/" + uuid)
                          .then((response) => {
                            toast({
                              duration: 3000,
                              colorScheme: "green",
                              description: "Template deletado com sucesso",
                            });
                            getTemplates();
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
                refresh={getTemplates}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
