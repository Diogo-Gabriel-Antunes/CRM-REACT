export default interface IFunil {
  uuid: string;
  nomeFunil: string;
  integracoes: string[];
}

export const funilDefault: IFunil = {
  integracoes: [],
  nomeFunil: "",
  uuid: "",
};
