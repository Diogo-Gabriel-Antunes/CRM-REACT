import React, { SetStateAction } from "react";
import ISelect from "../model/select";
import API from "../API";

export function getFunilSelect(
  setSelect: React.Dispatch<React.SetStateAction<ISelect[]>>
) {
  API.get<ISelect[]>("/funil/select").then((response) => {
    setSelect(response.data);
  });
}

export function getCampanhaSelect(
  setSelect: React.Dispatch<React.SetStateAction<ISelect[]>>
) {
  API.get<ISelect[]>("/campanha/select").then((response) => {
    setSelect(response.data);
  });
}

export function getEtapaFunilSelect(
  setSelect: React.Dispatch<React.SetStateAction<ISelect[]>>
) {
  API.get<ISelect[]>("/etapa-funil/select").then((response) => {
    setSelect(response.data);
  });
}

export function getFonteSelect(
  setSelect: React.Dispatch<React.SetStateAction<ISelect[]>>
) {
  API.get<ISelect[]>("/fonte/select").then((response) => {
    setSelect(response.data);
  });
}
export function formatData(dataValue: string) {
  var data = new Date(dataValue),
    dia = data.getDate().toString().padStart(2, "0"),
    mes = (data.getMonth() + 1).toString().padStart(2, "0"), //+1 pois no getMonth Janeiro começa com zero.
    ano = data.getFullYear();
  return dia + "/" + mes + "/" + ano;
}
