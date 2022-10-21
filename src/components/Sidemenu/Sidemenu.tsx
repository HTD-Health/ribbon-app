import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "../../utils/theme";

interface SidemenuProps {}

const Sidemenu: FunctionComponent<SidemenuProps> = () => {
  const menuItems = (
    <>
      <Flex as="nav" direction="column">
        <Text p="4px 8px" variant="label" mb={2}>
          Search
        </Text>

        <Link as={RouterLink} to={"/providers/search"}>
          <Text p="4px 8px">Providers</Text>
        </Link>
        <Link as={RouterLink} to={"/insurances/search"}>
          <Text p="4px 8px">Insurances</Text>
        </Link>
        <Link as={RouterLink} to={"/locations/search"}>
          <Text p="4px 8px">Locations</Text>
        </Link>
      </Flex>

      <Flex as="nav" direction="column" mt={3}>
        <Text p="4px 8px" variant="label" mb={2}>
          Estimates
        </Text>

        <Link as={RouterLink} to={"/condition_cost_estimate/search"}>
          <Text p="4px 8px">Condition cost</Text>
        </Link>
      </Flex>
    </>
  );

  return (
    <Box
      bg={colors.backgroundPrimary}
      borderRight="1px solid"
      borderColor={colors.borderFaded}
      w={200}
      h="100%"
      position="fixed"
      top="0"
      pt="80px"
      left={{ base: "-160px", xl: "0" }}
      zIndex={1005}
      transition="left 0.2s"
      _hover={{ base: { left: "0" } }}
    >
      <Flex
        justifyContent="flex-end"
        display={{ base: "flex", xl: "none" }}
        mr={3}
      >
        <HamburgerIcon />
      </Flex>

      {menuItems}
    </Box>
  );
};

export default Sidemenu;
