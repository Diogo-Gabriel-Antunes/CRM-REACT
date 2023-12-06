import { TableOptions } from "../../components/table";

export interface IProduto {
  nome: string;
  preco: Number;
}

export const produtoDefault: IProduto = {
  nome: "",
  preco: 0,
};

export function createTableStructureProduto(produtos: IProduto[]) {
  const tableStructure: TableOptions = {
    data: produtos,
    headers: ["Nome", "Preço"],
    options: [
      {
        headerOption: "Nome",
        listOption: "nome",
      },
      { headerOption: "Preço", listOption: "preco" },
    ],
    title: "Produtos",
  };
  return tableStructure;
}
