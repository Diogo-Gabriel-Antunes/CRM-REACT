import { IContato } from "../contato";
import { IEndereco } from "../endereco";

export interface ICliente {
  nome: string;
  sobrenome: string;
  contato: IContato;
  endereco: IEndereco;
  cargo: string;
  setor: string;
  minFaturamento: number;
  maxFaturamento: number;
}
