import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsComponent } from "./tabs";
import API from "../../API";
import { AxiosResponse } from "axios";

export default function MenuBar({ children }: { children: ReactNode }) {
  const [cliente, setCliente] = useState();
  const [agenda, setAgenda] = useState();
  const [dragDrop, setDragDrop] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const location = useLocation();
  if (location.pathname === "/") {
    return <>{children}</>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  function getClientes() {
    API.get<Tabs[]>("/menu/cliente").then((response: AxiosResponse) => {
      setCliente(response.data);
    });
  }

  function getAgenda() {
    API.get<Tabs[]>("/menu/agenda").then((response: AxiosResponse) => {
      setAgenda(response.data);
    });
  }

  function getDragDrop() {
    API.get<Tabs[]>("/menu/drag-drop").then((response: AxiosResponse) => {
      setDragDrop(response.data);
    });
  }
  if (!cliente && !agenda && !dragDrop) {
    getClientes();
    getAgenda();
    getDragDrop();
  }

  return (
    <Box>
      <Box
        bg={"WindowFrame"}
        w={"auto"}
        px={"3"}
        py={"2"}
        justifyContent={"space-between"}
        display={"flex"}
      >
        <Box>
          {" "}
          <>
            <Button
              leftIcon={<HamburgerIcon />}
              colorScheme="teal"
              onClick={onOpen}
            >
              Menu
            </Button>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>

                <DrawerBody></DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        </Box>
        <Box>
          <Box display={"flex"} w={"xl"} justifyContent={"space-between"}>
            <TabsComponent title="Cliente" tabs={cliente!} />
            <TabsComponent title="Agenda" tabs={agenda!} />
            <TabsComponent title="Drag Drop" tabs={dragDrop!} />
          </Box>
        </Box>
        <Box></Box>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}
