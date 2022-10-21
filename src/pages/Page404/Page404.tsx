import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { borderRadius, fontSize, colors } from "../../utils/theme";

interface Page404Props {}

const Page404: FunctionComponent<Page404Props> = () => {
  return (
    <Box borderRadius={borderRadius.page} bg={colors.backgroundPrimary} p={5}>
      <Heading as="h2" color={colors.highlight} fontSize={fontSize.h2}>
        Error 404
      </Heading>
      <Text mt={3}>
        Sorry, we could not take you to the page you were looking for.
      </Text>
      <Center p={5}>
        <Button
          as={RouterLink}
          to="/"
          colorScheme={colors.colorScheme}
          bg={colors.highlight}
          borderRadius={borderRadius.button}
          size="sm"
        >
          Take me back
        </Button>
      </Center>
    </Box>
  );
};

export default Page404;
