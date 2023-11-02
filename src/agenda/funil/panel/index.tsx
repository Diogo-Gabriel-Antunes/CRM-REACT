import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Compromisso } from "../../../model/calendario";

interface Props {
  title: string;
  compromisso: Compromisso;
}

export default function AccordionCompromisso({ title, compromisso }: Props) {
  if (!compromisso.uuid) {
    return <></>;
  }

  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{compromisso.diaDaSemana}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
