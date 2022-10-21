import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import CardData from "../../components/CardData/CardData";
import Spinner from "../../components/ui/Spinner";
import { StoreContext } from "../../context/StoreContext";
import { borderRadius, colors } from "../../utils/theme";
import { numberToCostString } from "../../utils/utils";

const ConditionCostEstimateResults = () => {
  const { conditionCostEstimateState } = useContext(StoreContext);

  if (conditionCostEstimateState?.loading)
    return (
      <Box>
        <Spinner />
      </Box>
    );

  if (conditionCostEstimateState?.data)
    return (
      <Box bg={colors.backgroundPrimary} borderRadius={borderRadius.page} p={5}>
        <Heading variant="h2">Condition cost estimate result</Heading>

        <Text variant="label">Parameters</Text>
        <CardData
          label="Gender"
          value={
            conditionCostEstimateState.data.parameters.member_gender === "m"
              ? "Male"
              : "Female"
          }
        />
        <CardData
          label="Age"
          value={conditionCostEstimateState.data.parameters.member_age}
        />
        <CardData
          label="Zip code"
          value={conditionCostEstimateState.data.parameters.member_zip}
        />
        <CardData
          label="Conditions"
          value={conditionCostEstimateState.data.parameters.conditions
            .map((c) => c.display)
            .join(", ")}
        />

        <Text variant="label" mt={3}>
          Cost etimates
        </Text>
        <CardData
          label="One year"
          value={numberToCostString(
            conditionCostEstimateState.data.data.cost_estimates.one_year
          )}
        />
        <CardData
          label="Five year"
          value={numberToCostString(
            conditionCostEstimateState.data.data.cost_estimates.five_year
          )}
        />
        <CardData
          label="Ten year"
          value={numberToCostString(
            conditionCostEstimateState.data.data.cost_estimates.ten_year
          )}
        />
        <CardData
          label="Lifetime"
          value={numberToCostString(
            conditionCostEstimateState.data.data.cost_estimates.lifetime
          )}
        />
      </Box>
    );
  else
    return (
      <>
        <Center>
          <Text>No results to display</Text>
        </Center>
        <Center p={5}>
          <Button as={RouterLink} to="/condition_cost_estimate/search">
            Back to search
          </Button>
        </Center>
      </>
    );
};

export default ConditionCostEstimateResults;
