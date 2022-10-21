import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "/logo.svg";
import { colors } from "../../utils/theme";

const Header = () => {
  return (
    <Box
      as="header"
      bg={colors.backgroundPrimary}
      position="fixed"
      width="100%"
      top="0"
      zIndex={1010}
      borderBottom="1px"
      borderColor={colors.borderFaded}
    >
      <Flex p="1rem" gap={8}>
        <Flex as={RouterLink} to="/" gap={1} cursor="pointer">
          <Image src={Logo} />
          <Box>
            <Heading as="h1" size="md">
              Ribbon
            </Heading>
            <Text fontWeight="light" fontSize={12} float="right" mt={-2}>
              poc
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
