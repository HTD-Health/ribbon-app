import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Provider } from "ribbon-client";
import { borderRadius, fontSize, colors } from "../../utils/theme";
import CardData from "../CardData/CardData";
import RatingStars from "../RatingStars/RatingStars";

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: FunctionComponent<ProviderCardProps> = ({ provider }) => {
  return (
    <Flex
      bg={colors.backgroundPrimary}
      p={7}
      pl={4}
      pr={4}
      borderRadius={borderRadius.card}
      direction="column"
      h={240}
    >
      <Heading as="h4" textAlign="center" fontSize={fontSize.h4}>
        {provider.first_name} {provider.middle_name} {provider.last_name}
      </Heading>

      {!!provider.degrees?.length ? (
        <Text
          textAlign="center"
          color={colors.textFaded}
          fontSize={fontSize.text}
        >
          {provider.degrees[0]}
        </Text>
      ) : null}

      {/* rating */}
      <Center mt={2}>
        <RatingStars
          rating={provider.ratings_avg}
          ratingsCount={provider.ratings_count}
        />
      </Center>

      {/* short info */}
      <Box w="50%" mt={2} mb={2}>
        <CardData label="Gender" value={provider.gender} />
        <CardData label="Age" value={provider.age} />
      </Box>

      <Center p={5}>
        <Button as={RouterLink} to={`/providers/${provider.npi}`}>
          Show
        </Button>
      </Center>
    </Flex>
  );
};

export default ProviderCard;
