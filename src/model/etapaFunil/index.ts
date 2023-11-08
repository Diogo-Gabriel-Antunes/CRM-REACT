import { TableOptions } from "../../components/table";
import IFunil, { funilDefault } from "../funil";

export default interface IEtapaFunil {
  uuid: string;
  etapa: string;
  nivel: string;
  ativo: boolean;
  funil: IFunil;
  finalizacao: boolean;
}

export const etapaFunilDefault = {
  ativo: true,
  etapa: "",
  finalizacao: false,
  funil: funilDefault,
  nivel: "",
  uuid: "",
};

export function createTableStructureEtapaFunil(
  data: IEtapaFunil[],
  title: string
) {
  const tableStructure: TableOptions = {
    data: data,
    headers: ["Etapa", "Nivel", "Finalização", "Ativo"],
    options: [
      { headerOption: "Etapa", listOption: "etapa" },
      { headerOption: "Nivel", listOption: "nivel" },
      { headerOption: "Finalização", listOption: "finalizacao" },
      { headerOption: "Ativo", listOption: "ativo" },
    ],
    title: title,
  };
  return tableStructure;
}
