export default interface ICargaHoraria {
  diaDaSemana: string;
  horarioEntrada: string;
  horarioSaida: string;
}

export const cargaHorariaDefault: ICargaHoraria = {
  diaDaSemana: "",
  horarioEntrada: "",
  horarioSaida: "",
};
