import { Select } from "@chakra-ui/react";
import ISelect from "../../model/select";

interface Props {
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ISelect[];
}

export default function SelectPadrao({ value, onChange, options }: Props) {
  return (
    <Select value={value} onChange={(e) => onChange(e)} bg={"white"}>
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </Select>
  );
}
