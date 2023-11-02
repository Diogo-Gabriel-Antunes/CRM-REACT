import { Box, Input } from "@chakra-ui/react";

interface Props {
  data: string;
}

export default function TabTarefa({ data }: Props) {
  return (
    <>
      <Box>
        <Box>
          <Input type="date" value={data} readOnly />
        </Box>
      </Box>
    </>
  );
}
