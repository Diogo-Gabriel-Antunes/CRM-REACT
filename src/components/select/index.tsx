import { Select } from "@chakra-ui/react";
import ISelect from "../../model/select";

interface Props {
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ISelect[];
  placeHolder: string;
}

export default function SelectPadrao({
  value,
  onChange,
  options,
  placeHolder,
}: Props) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e)}
      bg={"white"}
      placeholder={placeHolder}
    >
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </Select>
  );
}
