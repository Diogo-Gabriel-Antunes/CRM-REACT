import { Box, FormLabel, Select, list } from "@chakra-ui/react";
import ISelect from "../../model/select";
import SelectPadrao from "../select";
import ICargaHoraria from "../../model/cargaHoraria";
import React, { SetStateAction } from "react";

interface Props {
  value: ICargaHoraria;
  set: React.Dispatch<SetStateAction<ICargaHoraria>>;
}

export default function CargaHorariaBody({ value, set }: Props) {
  const listHorarios: ISelect[] = [
    {
      label: "01:00",
      value: "H01",
    },
    {
      label: "02:00",
      value: "H02",
    },
    {
      label: "03:00",
      value: "H03",
    },
    {
      label: "04:00",
      value: "H04",
    },
    {
      label: "05:00",
      value: "H05",
    },
    {
      label: "06:00",
      value: "H06",
    },
    {
      label: "07:00",
      value: "H07",
    },
    {
      label: "08:00",
      value: "H08",
    },
    {
      label: "09:00",
      value: "H09",
    },
    {
      label: "10:00",
      value: "H10",
    },
    {
      label: "11:00",
      value: "H11",
    },
    {
      label: "12:00",
      value: "H12",
    },
    {
      label: "13:00",
      value: "H13",
    },
    {
      label: "14:00",
      value: "H14",
    },
    {
      label: "15:00",
      value: "H15",
    },
    {
      label: "16:00",
      value: "H16",
    },
    {
      label: "17:00",
      value: "H17",
    },
    {
      label: "18:00",
      value: "H18",
    },
    {
      label: "19:00",
      value: "H19",
    },
    {
      label: "20:00",
      value: "H20",
    },
    {
      label: "21:00",
      value: "H21",
    },
    {
      label: "22:00",
      value: "H22",
    },
    {
      label: "23:00",
      value: "H23",
    },
    {
      label: "24:00",
      value: "H24",
    },
  ];

  return (
    <>
      <Box>
        <FormLabel fontWeight={"bold"}>Entrada</FormLabel>
        <SelectPadrao
          options={listHorarios}
          onChange={(e) => set({ ...value, horarioEntrada: e.target.value })}
          value={value.horarioEntrada}
          placeHolder="Entrada"
        />
      </Box>
      <Box my={"5"}>
        <FormLabel fontWeight={"bold"}>Saida</FormLabel>
        <SelectPadrao
          options={listHorarios}
          onChange={(e) => set({ ...value, horarioSaida: e.target.value })}
          value={value.horarioSaida}
          placeHolder="Saida"
        />
      </Box>
    </>
  );
}
