import { ICliente, clienteDefault } from "../Cliente";
import ICampanha, { campanhaDefault } from "../campanha";
import { contatoDefault } from "../contato";
import { enderecoDefault } from "../endereco";
import IEtapaFunil, { etapaFunilDefault } from "../etapaFunil";
import IFonte, { fonteDefault } from "../fonta";
import IFunil, { funilDefault } from "../funil";

export default interface ICompromisso {
  uuid?: string;
  inicioCompromisso: string;
  fimCompromisso: string;
  diaDaSemana: string;
  mes: string;
  horario: string;
  tipoCompromisso: string;
  diaDoMes: string;
  oportunidades: IOportunidade;
  tarefas: ITarefa;
}

interface IOportunidade {
  uuid?: string;
  nomeOportunidade: string;
  funil: IFunil;
  etapaDoFunil: IEtapaFunil;
  fonte: IFonte;
  campanha: ICampanha;
  cliente: ICliente;
  compromisso?: ICompromisso;
}

export interface ITarefa {
  uuid?: string;
  tipoDeTarefa: string;
  horaMarcada?: Date;
  cliente: ICliente;
}

export const tarefaDefault: ITarefa = {
  uuid: "",
  tipoDeTarefa: "",
  cliente: clienteDefault,
};

export const oportunidadeDefault: IOportunidade = {
  uuid: "",
  nomeOportunidade: "",
  funil: funilDefault,
  etapaDoFunil: etapaFunilDefault,
  fonte: fonteDefault,
  campanha: campanhaDefault,
  cliente: clienteDefault,
};

export const compromissoDefault: ICompromisso = {
  uuid: "",
  inicioCompromisso: "",
  fimCompromisso: "",
  diaDaSemana: "",
  mes: "",
  horario: "",
  tipoCompromisso: "",
  diaDoMes: "",
  oportunidades: oportunidadeDefault,
  tarefas: tarefaDefault,
};
