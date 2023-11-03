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
