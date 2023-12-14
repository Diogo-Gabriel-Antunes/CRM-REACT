import { TableOptions } from "../../components/table";

export interface ITemplate {
  tituloTemplate: string;
  nomeTemplate: string;
  template: string;
  tipoTemplate: string;
}

export const templateDefault: ITemplate = {
  tituloTemplate: "",
  nomeTemplate: "",
  template: "",
  tipoTemplate: "",
};

export function createTableStructureTemplate(templates: ITemplate[]) {
  const tableStructure: TableOptions = {
    data: templates,
    headers: ["Nome", "Titulo", "Ativo"],
    options: [
      {
        headerOption: "Nome",
        listOption: "nomeTemplate",
      },
      {
        headerOption: "Titulo",
        listOption: "tituloTemplate",
      },
      {
        headerOption: "Ativo",
        listOption: "ativo",
      },
    ],
    title: "Templates",
  };
  return tableStructure;
}
