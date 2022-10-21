import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Insurance } from "ribbon-client";
import { borderRadius, colors, fontSize } from "../../utils/theme";
import CardData from "../CardData/CardData";
import states from "../../../data/usStates.json";

interface InsuranceCardProps {
  insurance: Insurance;
}

const InsuranceCard: FunctionComponent<InsuranceCardProps> = ({
  insurance,
}) => {
  return (
    <Flex
      bg={colors.backgroundPrimary}
      p={7}
      pl={4}
      pr={4}
      borderRadius={borderRadius.card}
      direction="column"
      gap={2}
    >
      <Heading as="h4" textAlign="center" fontSize={fontSize.h4}>
        {insurance.carrier_name}
      </Heading>

      <Text
        textAlign="center"
        color={colors.textFaded}
        fontSize={fontSize.text}
      >
        {insurance.carrier_brand}
      </Text>

      <Box mt={2} mb={2}>
        <CardData label="Carrier name" value={insurance.carrier_name} />
        <CardData
          label="Carrier association"
          value={insurance.carrier_association}
        />
        <CardData label="Plan type" value={insurance.plan_type} />
        <CardData label="Plan name" value={insurance.plan_name} />
        <CardData label="Category" value={insurance.category} />
        <CardData
          label="State"
          value={states.find((s) => s.id === insurance.state)?.value}
        />
        <CardData label="Codes" value={insurance.codes?.join(", ")} />
      </Box>
    </Flex>
  );
};

export default InsuranceCard;
