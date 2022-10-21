import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { borderRadius, colors } from "../../utils/theme";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const imgUrl = import.meta.env.VITE_HOME_IMG_URL;

  return (
    <>
      <Box borderRadius={borderRadius.page} bg={colors.backgroundPrimary} p={5}>
        <Heading as="h2" variant="h2">
          HTD with Ribbon!
        </Heading>
        <Text mt={3}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
          dicta fugiat, officia vero nemo magni voluptatum quibusdam, neque
          distinctio aliquid dolorem saepe architecto. Quasi officiis ducimus
          earum excepturi iusto alias!
        </Text>
      </Box>
      <Flex
        borderRadius={borderRadius.page}
        bg={colors.backgroundPrimary}
        mt={3}
        overflow="hidden"
      >
        <Box flex={1} p={5}>
          <Heading as="h3" variant="h3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
            consectetur aspernatur eveniet totam.
          </Heading>
          <Text mt={3}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
            accusantium nostrum repudiandae illo! Suscipit ipsum quisquam
            quibusdam accusamus molestiae ad eius. Molestiae, sed ullam!
          </Text>
          <Text mt={3}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
            voluptate harum tenetur blanditiis a at rem esse eligendi alias
            dolor.
          </Text>
        </Box>

        {import.meta.env.VITE_HOME_IMG_URL && (
          <Box
            flex={1}
            bg={`url(${import.meta.env.VITE_HOME_IMG_URL})`}
            bgSize="cover"
          ></Box>
        )}
      </Flex>
    </>
  );
};

export default Home;
