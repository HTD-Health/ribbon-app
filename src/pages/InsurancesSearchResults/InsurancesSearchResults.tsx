import { Box, Button, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Insurance } from "ribbon-client";
import InsuranceCard from "../../components/InsuranceCard/InsuranceCard";
import Spinner from "../../components/ui/Spinner";
import { StoreContext } from "../../context/StoreContext";

const InsuranceSearchResults = () => {
  const { insurancesState } = useContext(StoreContext);

  if (insurancesState?.loading)
    return (
      <Box>
        <Spinner />
      </Box>
    );

  if (!!insurancesState?.data?.results.length)
    return (
      <Box>
        <Grid gap="16px" templateColumns="repeat(2, 1fr)">
          {insurancesState?.data?.results.map((i: Insurance) => {
            return (
              <GridItem
                key={`provider-card-${i.uuid}`}
                as={InsuranceCard}
                insurance={i}
              />
            );
          })}
        </Grid>
      </Box>
    );
  else
    return (
      <>
        <Center>
          <Text>{insurancesState?.error || "No data to display"}</Text>
        </Center>
        <Center p={5}>
          <Button as={RouterLink} to="/insurances/search">
            Back to search
          </Button>
        </Center>
      </>
    );
};

export default InsuranceSearchResults;
