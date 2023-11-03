export interface IEndereco {
  logradouro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
}

export const enderecoDefault: IEndereco = {
  logradouro: "",
  cidade: "",
  estado: "",
  pais: "",
  cep: "",
};
