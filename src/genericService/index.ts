import React, { SetStateAction } from "react";
import ISelect from "../model/select";
import API from "../API";

 

export function getFunilSelect(setSelect:React.Dispatch<React.SetStateAction<ISelect[]>>){
    API.get<ISelect[]>("/funil/select").then(response=>{
        setSelect(response.data);
    })
}

export function getCampanhaSelect(setSelect:React.Dispatch<React.SetStateAction<ISelect[]>>){
    API.get<ISelect[]>("/campanha/select").then(response=>{
        setSelect(response.data);
    })
}

export function getEtapaFunilSelect(setSelect:React.Dispatch<React.SetStateAction<ISelect[]>>){
    API.get<ISelect[]>("/etapa-funil/select").then(response=>{
        setSelect(response.data);
    })
}

export function getFonteSelect(setSelect:React.Dispatch<React.SetStateAction<ISelect[]>>){
    API.get<ISelect[]>("/fonte/select").then(response=>{
        setSelect(response.data);
    })
}