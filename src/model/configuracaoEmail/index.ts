import { TableOptions } from "../../components/table";

export interface IConfiguracaoEmail {
  username: string;
  password: string;
  host: string;
  stpmPort: string;
  sslSupport: boolean;
}

export function createTableStructureConfiguracaoEmail(
  configuracoes: IConfiguracaoEmail[]
) {
  const tableStructure: TableOptions = {
    data: configuracoes,
    headers: ["Usuario", "Host", "StmpPort"],
    options: [
      {
        headerOption: "Usuario",
        listOption: "username",
      },
      {
        headerOption: "Host",
        listOption: "host",
      },
      {
        headerOption: "StmpPort",
        listOption: "stmpPort",
      },
    ],
    title: "Configurações Email",
  };
  return tableStructure;
}
