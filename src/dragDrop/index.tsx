import { Box } from "@chakra-ui/react";
import SelectPadrao from "../components/select";
import { useEffect, useState } from "react";
import API from "../API";
import ISelect from "../model/select";
import IFunil, { funilDefault } from "../model/funil";
import IEtapaFunil, { etapaFunilDefault } from "../model/etapaFunil";
import { IDragDrop, ILead, ResponseLead } from "../model/lead";
import CardLead from "../components/card";

export default function DragDropHome() {
  const [funilsSelect, setFunilSelect] = useState<ISelect[]>([]);
  const [funilSelected, setFunilSelected] = useState<IFunil>(funilDefault);
  const [etapaFunilSelect, setEtapaFunilSelect] = useState<ISelect[]>([]);
  const [etapafunilSelected, setEtapaFunilSelected] =
    useState<IEtapaFunil>(etapaFunilDefault);

  const [dragDrop, setDragDrop] = useState<IDragDrop[]>([]);

  function onChangeSelectFunil(e: React.ChangeEvent<HTMLSelectElement>) {
    API.get(`/funil/${e.target.value}`).then((response) =>
      setFunilSelected(response.data)
    );
    getEtapaFunilSelect(e.target.value);
  }

  function onChangeSelectEtapaFunil(e: React.ChangeEvent<HTMLSelectElement>) {
    API.get(`/etapa-funil/${e.target.value}`).then((response) =>
      setEtapaFunilSelected(response.data)
    );
  }

  function getEtapaFunilSelect(funilUuid: string) {
    API.get(`/etapa-funil/select?funilUuid=${funilUuid}`).then((response) => {
      setEtapaFunilSelect(response.data);
    });
  }

  function getDragDrop(funilUuid: string) {
    API.get(`/lead/drag-drop?funilUuid=${funilUuid}`).then((response) =>
      setDragDrop(response.data)
    );
  }

  useEffect(() => {
    API.get("/funil/select").then((response) => setFunilSelect(response.data));

    if (funilSelected.uuid === "") {
      API.get<IFunil>("/funil/padrao").then((response) => {
        setFunilSelected(response.data);
        getEtapaFunilSelect(response.data.uuid);
        getDragDrop(response.data.uuid);
      });
    }
  }, []);

  console.log(dragDrop);

  return (
    <>
      <Box>
        <Box w={"full"} bg={"WindowFrame"} display={"flex"} p={"5"}>
          <Box>
            <SelectPadrao
              options={funilsSelect}
              onChange={onChangeSelectFunil}
              placeHolder="Funil"
              value={funilSelected.uuid}
            />
          </Box>
        </Box>
        <Box>
          <Box display={"flex"} overflow={"auto"} p={"5"}>
            {dragDrop?.map((drag) => (
              <CardLead
                etapaName={drag.etapaName}
                leads={drag.leads}
                refresh={getDragDrop}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
