import { IContato, contatoDefault } from "../contato";
import { IEndereco, enderecoDefault } from "../endereco";

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

export const clienteDefault: ICliente = {
  nome: "",
  sobrenome: "",
  contato: contatoDefault,
  endereco: enderecoDefault,
  cargo: "",
  setor: "",
  minFaturamento: 0,
  maxFaturamento: 0,
};
