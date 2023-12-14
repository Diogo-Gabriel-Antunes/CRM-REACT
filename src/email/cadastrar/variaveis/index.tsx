import { Box } from "@chakra-ui/react";

interface Props {
  tipoTemplate: string;
}

export default function TemplateVariaveis({ tipoTemplate }: Props) {
  const listVariaveisVenda = [
    {
      slug: "Nome Cliente",
      value: "{NomeCliente}",
    },
    {
      slug: "Email Cliente",
      value: "{EmailCliente}",
    },
    {
      slug: "Valor venda",
      value: "{ValorVenda}",
    },
  ];
  const listVariaveisPrimeiroContato = [
    {
      slug: "Nome Cliente",
      value: "{NomeCliente}",
    },
  ];
  const listVariaveisPromocao = [
    {
      slug: "Nome Cliente",
      value: "{NomeCliente}",
    },
    {
      slug: "Email Cliente",
      value: "{EmailCliente}",
    },
    {
      slug: "Valor Promoção",
      value: "{ValorPromocao}",
    },
  ];

  return (
    <>
      {tipoTemplate && (
        <Box
          borderRadius={"base"}
          border={"1px"}
          my={"2"}
          p={"2"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          {tipoTemplate === "VENDA" &&
            listVariaveisVenda.map((variaveis: any) => (
              <>
                <Box>
                  {variaveis.slug} = {variaveis.value}
                </Box>
              </>
            ))}
          {tipoTemplate === "PRIMEIROCONTATO" &&
            listVariaveisPrimeiroContato.map((variaveis: any) => (
              <>
                <Box>
                  {variaveis.slug} = {variaveis.value}
                </Box>
              </>
            ))}
          {tipoTemplate === "PROMOCAO" &&
            listVariaveisPromocao.map((variaveis: any) => (
              <>
                <Box>
                  {variaveis.slug} = {variaveis.value}
                </Box>
              </>
            ))}
        </Box>
      )}
    </>
  );
}
