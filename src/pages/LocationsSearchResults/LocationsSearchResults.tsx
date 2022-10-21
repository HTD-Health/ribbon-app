import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import LocationList from "../../components/LocationList/LocationList";
import Spinner from "../../components/ui/Spinner";
import { StoreContext } from "../../context/StoreContext";
import { borderRadius, colors } from "../../utils/theme";

const LocationsSearchResults = () => {
  const { locationsState } = useContext(StoreContext);

  if (locationsState?.loading)
    return (
      <Box>
        <Spinner />
      </Box>
    );

  if (locationsState?.data)
    return (
      <Box p={5} bg={colors.backgroundPrimary} borderRadius={borderRadius.page}>
        <LocationList locations={locationsState?.data?.data} />
      </Box>
    );
  else
    return (
      <>
        <Center>
          <Text>{locationsState?.error || "No data to display"}</Text>
        </Center>
        <Center p={5}>
          <Button as={RouterLink} to="/locations/search">
            Back to search
          </Button>
        </Center>
      </>
    );
};

export default LocationsSearchResults;
