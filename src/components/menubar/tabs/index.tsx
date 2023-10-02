import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  tabs: Tabs[];
}
export interface Tabs {
  link: string;
  subTitle: string;
}
export function TabsComponent({ title, tabs }: Props) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        bg={"teal"}
        color={"white"}
      >
        {title}
      </MenuButton>
      <MenuList>
        {tabs?.map((tab) => (
          <Link to={tab.link}>
            <MenuItem>{tab.subTitle}</MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
}
