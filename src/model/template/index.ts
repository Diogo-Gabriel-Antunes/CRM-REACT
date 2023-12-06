import { TableOptions } from "../../components/table";

export interface ITemplate {
  nomeTemplate: string;
  template: string;
}

export const templateDefault: ITemplate = {
  nomeTemplate: "",
  template: "",
};

export function createTableStructureTemplate(templates: ITemplate[]) {
  const tableStructure: TableOptions = {
    data: templates,
    headers: ["Nome", "Ativo"],
    options: [
      {
        headerOption: "Nome",
        listOption: "nomeTemplate",
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
