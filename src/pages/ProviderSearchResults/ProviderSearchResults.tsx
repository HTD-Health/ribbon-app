import { Box, Button, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Provider } from "ribbon-client";
import ProviderCard from "../../components/ProviderCard/ProviderCard";
import Spinner from "../../components/ui/Spinner";
import { StoreContext } from "../../context/StoreContext";

const ProviderSearchResults = () => {
  const { providersState } = useContext(StoreContext);

  if (providersState?.loading)
    return (
      <Box>
        <Spinner />
      </Box>
    );

  if (providersState?.data)
    return (
      <Box>
        <Grid gap="16px" templateColumns="repeat(2, 1fr)">
          {providersState?.data?.data.map((p: Provider, i: number) => {
            const provider = p as Provider;
            return (
              <GridItem
                key={`provider-card-${i}`}
                as={ProviderCard}
                provider={provider}
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
          <Text>{providersState?.error || "No data to display"}</Text>
        </Center>
        <Center p={5}>
          <Button as={RouterLink} to="/providers/search">
            Back to search
          </Button>
        </Center>
      </>
    );
};

export default ProviderSearchResults;
