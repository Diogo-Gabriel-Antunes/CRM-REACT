import { Box } from "@chakra-ui/react";
import SelectPadrao from "../components/select";
import { useEffect, useState } from "react";
import API from "../API";
import ISelect from "../model/select";
import IFunil, { funilDefault } from "../model/funil";
import IEtapaFunil, { etapaFunilDefault } from "../model/etapaFunil";
import { IDragDrop, ILead, ResponseLead } from "../model/lead";
import CardLead from "../components/card";

export default function PedidoHome() {
  const [dragDrop, setDragDrop] = useState<IDragDrop[]>([]);

  function getDragDrop() {
    API.get(`/pedido/drag-drop`).then((response) => {
      console.log(response.data);
      setDragDrop(response.data);
    });
  }
  useEffect(() => {
    getDragDrop();
  }, []);

  return (
    <>
      <Box>
        <Box w={"full"} bg={"WindowFrame"} display={"flex"} p={"5"}></Box>
        <Box>
          <Box display={"flex"} overflow={"auto"} p={"5"}></Box>
        </Box>
      </Box>
    </>
  );
}
