import { ICliente } from "../Cliente";
import IEtapaFunil from "../etapaFunil";
import IFunil from "../funil";

export interface ResponseLead {
  etapaUuid: string;
  leads: Leads[];
}

export interface ILead {
  anotacoes: [];
  data: string;
  descricao: string;
  etapaDofunil: IEtapaFunil;
  funil: IFunil;
  cliente: ICliente;
  uuid: string;
}

export interface Leads {
  lead: ILead;
  posicao: number;
  relevancia: string;
}

export interface IDragDrop {
  etapaName: string;
  leads: Leads[];
}
