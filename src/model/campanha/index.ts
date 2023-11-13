import IFunil from "../funil";

export default interface ICampanha {
  uuid: string;
  campanha: string;
  nomeCampanha?: string;
  ativa?: boolean;
  funil?: IFunil[];
}

export const campanhaDefault: ICampanha = { campanha: "", uuid: "" };

export function createTableStructureCampanha(data: ICampanha[]) {
  return {
    data: data,
    headers: ["Campanha", "Status", "Data de criação"],
    options: [
      { headerOption: "Campanha", listOption: "campanha" },
      { headerOption: "Status", listOption: "status" },
      { headerOption: "Data de criação", listOption: "dataCriacao" },
    ],
    title: "Campanhas",
  };
}
