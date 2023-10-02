import { ICliente } from "../../model/Cliente";
import React, {
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface InfosAgendamento {
  tipoAgendamento: string;
  dataAgendamento: string;
  funilUuid: string;
  etapaDoFunilUuid: string;
  valor?: number;
}

interface IClienteContext {
  cliente: ICliente;
  setCliente: React.Dispatch<SetStateAction<ICliente>>;
  agendamento: InfosAgendamento;
  setAgendamento: React.Dispatch<SetStateAction<InfosAgendamento>>;
}

export const ClienteContextObject = {
  cliente: {
    cargo: "",
    contato: {
      email: "",
      telefone: "",
      telefone2: "",
    },
    endereco: {
      cep: "",
      cidade: "",
      estado: "",
      logradouro: "",
      pais: "",
    },
    maxFaturamento: 0,
    minFaturamento: 0,
    nome: "",
    setor: "",
    sobrenome: "",
  },
  agendamento: {
    dataAgendamento: "",
    tipoAgendamento: "",
    funilUuid: "",
    etapaDoFunilUuid: "",
  },
  setCliente: () => {},
  setAgendamento: () => {},
};
export const ClienteClear = {
  cargo: "",
  contato: {
    email: "",
    telefone: "",
    telefone2: "",
  },
  endereco: {
    cep: "",
    cidade: "",
    estado: "",
    logradouro: "",
    pais: "",
  },
  maxFaturamento: 0,
  minFaturamento: 0,
  nome: "",
  setor: "",
  sobrenome: "",
};
export const ClienteContext =
  createContext<IClienteContext>(ClienteContextObject);

const ClienteContextProvider = ({ children }: { children: ReactNode }) => {
  const [agendamento, setAgendamento] = useState<InfosAgendamento>({
    dataAgendamento: "",
    tipoAgendamento: "",
    funilUuid: "",
    etapaDoFunilUuid: "",
  });
  const [cliente, setCliente] = useState(ClienteClear);

  return (
    <ClienteContext.Provider
      value={{
        agendamento: agendamento,
        setAgendamento: setAgendamento,
        cliente: cliente,
        setCliente: setCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};

export default ClienteContextProvider;
