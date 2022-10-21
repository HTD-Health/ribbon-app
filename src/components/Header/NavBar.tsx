interface NavBarProps {}
import { HStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import NavBarLink from "./NavBarLink";

const NavBar: FunctionComponent<NavBarProps> = () => {
  return (
    <HStack>
      <NavBarLink to={"/"} text="Home" />
      <NavBarLink to={"/providers/search"} text="Providers" />
      <NavBarLink to={"/providers/results"} text="Results" />
    </HStack>
  );
};

export default NavBar;
