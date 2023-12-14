import { TableOptions } from "../../components/table";
import { IProduto, produtoDefault } from "../produto";

export interface IPromocao {
  nomePromocao: string;
  porcetagem: number;
  itensPromocaos: ItensPromocao[];
}

export const promocaoDefault: IPromocao = {
  nomePromocao: "",
  porcetagem: 0,
  itensPromocaos: [],
};

export interface ItensPromocao {
  uuid: number | null;
  produtos: IProduto;
  quantidade: number;
}
export function createTableStructurePromocao(produtos: IPromocao[]) {
  const tableStructure: TableOptions = {
    data: produtos,
    headers: ["Nome Promoção", "Porcentagem", "Quantidade de produtos"],
    options: [
      {
        headerOption: "Nome",
        listOption: "nomePromocao",
      },
      { headerOption: "Porcentagem", listOption: "porcetagem" },
      {
        headerOption: "Quantidade de Produtos",
        listOption: "quantidadeDeProdutos",
      },
    ],
    title: "Produtos",
  };
  return tableStructure;
}
