import { Box, Text } from "@chakra-ui/react";
import { fontSize, colors } from "../utils/theme";

const Footer = () => (
  <Box as="footer" bottom="0" w="100%" p="1rem">
    <Box pt={3} pb={3}>
      <Text
        fontSize={fontSize.textMin}
        color={colors.textFaded}
        textAlign="center"
      >
        © 2022 HTD
      </Text>
    </Box>
  </Box>
);

export default Footer;
