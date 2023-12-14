import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import ModalPesquisaConfiguracoesEmailGeneric from "../../components/modalConfiguracoesEmail";
import { useEffect, useState } from "react";
import API, { MSEmail } from "../../API";
import {
  IConfiguracaoEmail,
  configuracaoEmailDefault,
} from "../../model/configuracaoEmail";
import ModalPesquisaTemplateGeneric from "../../components/modalTemplates";
import { ITemplate, templateDefault } from "../../model/template";
import ModalPesquisaClienteGeneric from "../../components/modalCliente";
import { AddIcon } from "@chakra-ui/icons";
import { ICliente, clienteDefault } from "../../model/Cliente";
import TableEnviarEmail from "./table";
import ModalPesquisaPromocoesGeneric from "../../components/modalPromocao";
import { IPromocao, promocaoDefault } from "../../model/promocao";

export interface ListEmails {
  uuid: number;
  configuracaoNome: string;
  templateNome: string;
  clienteNome: string;
  enviante: string;
}

export interface ListForAPI {
  uuid: number;
  configuracaoEmail: IConfiguracaoEmail;
  template: ITemplate;
  cliente: ICliente;
}
export default function EnviarEmailHome() {
  const [configuracaoEmailUuid, setConfiguracaoEmailUuid] = useState("");
  const [clienteUuid, setClienteUuid] = useState("");
  const [cliente, setCliente] = useState(clienteDefault);
  const [configuracaoEmail, setConfiguracaoEmail] = useState(
    configuracaoEmailDefault
  );
  const [enviante, setEnviante] = useState("");
  const [uuid, setUuid] = useState(0);
  const [promocao, setPromocao] = useState<IPromocao>(promocaoDefault);
  const [promocaoUuid, setPromocaoUuid] = useState("");
  const [list, setList] = useState<ListEmails[]>([]);
  const [listForApi, setListForApi] = useState<ListForAPI[]>([]);
  const [templateUuid, setTemplateUuid] = useState("");
  const [template, setTemplate] = useState(templateDefault);
  const toast = useToast();
  useEffect(() => {
    if (configuracaoEmailUuid !== "") {
      MSEmail.get("/configuracao-email/" + configuracaoEmailUuid).then(
        (response) => setConfiguracaoEmail(response.data)
      );
    }
  }, [configuracaoEmailUuid]);

  useEffect(() => {
    if (templateUuid !== "") {
      MSEmail.get("/template/" + templateUuid).then((response) =>
        setTemplate(response.data)
      );
    }
  }, [templateUuid]);

  useEffect(() => {
    if (clienteUuid !== "") {
      API.get("/cliente/" + clienteUuid).then((response) =>
        setCliente(response.data)
      );
    }
  }, [clienteUuid]);

  useEffect(() => {
    if (promocaoUuid !== "") {
      API.get("/promocao/" + promocaoUuid).then((response) =>
        setPromocao(response.data)
      );
    }
  }, [promocaoUuid]);

  function enviar() {
    MSEmail.post("/send-email", listForApi).then((response) =>
      toast({
        duration: 3000,
        colorScheme: "green",
        description: "Enviado com sucesso",
      })
    );
  }

  function add() {
    var dtoList: ListEmails = {
      uuid: uuid,
      configuracaoNome: configuracaoEmail.username,
      templateNome: template.nomeTemplate,
      clienteNome: cliente.nome,
      enviante: enviante,
    };

    setList([...list, dtoList]);
    setListForApi([
      ...listForApi,
      {
        uuid: uuid,
        configuracaoEmail,
        template,
        cliente,
      },
    ]);
    setUuid(uuid + 1);

    setCliente(clienteDefault);
    setTemplate(templateDefault);
    setConfiguracaoEmail(configuracaoEmailDefault);
    setEnviante("");
  }

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
              {" "}
              <Box
                w={"container.xl"}
                height={"container.sm"}
                overflowY={"auto"}
                p={"5"}
              >
                <SimpleGrid columns={3} spacing={20}>
                  <ModalPesquisaConfiguracoesEmailGeneric
                    configuracaoEmail={configuracaoEmail}
                    setUuid={setConfiguracaoEmailUuid}
                    uuid={configuracaoEmailUuid}
                  />
                  <ModalPesquisaTemplateGeneric
                    setUuid={setTemplateUuid}
                    tempĺate={template}
                    uuid={templateUuid}
                  />
                  <InputGroup>
                    <Input
                      placeholder="Cliente"
                      disabled
                      value={cliente.nome}
                    />
                    <InputRightElement>
                      <ModalPesquisaClienteGeneric
                        setUuid={setClienteUuid}
                        uuid={clienteUuid}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <Box>
                    <Input
                      placeholder="E-mail do enviante"
                      value={enviante}
                      onChange={(e) => setEnviante(e.target.value)}
                    />
                  </Box>
                  <IconButton
                    icon={<AddIcon />}
                    aria-label="add icon"
                    colorScheme="green"
                    onClick={add}
                  />
                  <Box>
                    {template.tipoTemplate === "PROMOCAO" && (
                      <ModalPesquisaPromocoesGeneric
                        promocao={promocao}
                        setUuid={setPromocaoUuid}
                        uuid={promocaoUuid}
                      />
                    )}
                  </Box>
                </SimpleGrid>
                <Box mt={"10"}>
                  <TableEnviarEmail
                    list={list}
                    setList={setList}
                    listForApi={listForApi}
                    setListForApi={setListForApi}
                  />
                </Box>
                <Box display={"flex"} justifyContent={"end"}>
                  <Button colorScheme="green" onClick={enviar}>
                    Enviar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
