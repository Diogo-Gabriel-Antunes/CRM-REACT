import ICompromisso from "../compromisso";

export interface CalendarioHorarios {
  compromisso: ICompromisso;
  horario: string;
}

export interface Dias {
  calendarioHorarios: CalendarioHorarios[];
  diaDoMes: string;
}
export interface Calendario {
  dias: Dias[];
  mes: string;
}

export enum Mes {
  "JANEIRO" = 0,
  "FEVEREIRO" = 1,
  "MARCO" = 2,
  "ABRIL" = 3,
  "MAIO" = 4,
  "JUNHO" = 5,
  "JULHO" = 6,
  "AGOSTO" = 7,
  "SETEMBRO" = 8,
  "OUTUBRO" = 9,
  "NOVEMBRO" = 10,
  "DEZEMBRO" = 11,
}

export enum Dia {
  "DIA_1" = 1,
  "DIA_2" = 2,
  "DIA_3" = 3,
  "DIA_4" = 4,
  "DIA_5" = 5,
  "DIA_6" = 6,
  "DIA_7" = 7,
  "DIA_8" = 8,
  "DIA_9" = 9,
  "DIA_10" = 10,
  "DIA_11" = 11,
  "DIA_12" = 12,
  "DIA_13" = 13,
  "DIA_14" = 14,
  "DIA_15" = 15,
  "DIA_16" = 16,
  "DIA_17" = 17,
  "DIA_18" = 18,
  "DIA_19" = 19,
  "DIA_20" = 20,
  "DIA_21" = 21,
  "DIA_22" = 22,
  "DIA_23" = 23,
  "DIA_24" = 24,
  "DIA_25" = 25,
  "DIA_26" = 26,
  "DIA_27" = 27,
  "DIA_28" = 28,
  "DIA_29" = 29,
  "DIA_30" = 30,
  "DIA_31" = 31,
}
