import {
  Box,
  Button,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import InsuranceList from "./InsuranceList";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { Provider as ProviderType } from "ribbon-client";
import RatingStars from "../../components/RatingStars/RatingStars";
import Spinner from "../../components/ui/Spinner";
import { borderRadius, colors } from "../../utils/theme";
import CardData from "../../components/CardData/CardData";
import ProviderProceduresAndTreatment from "./ProviderProceduresAndTreatment";
import LocationList from "../../components/LocationList/LocationList";

const Provider = () => {
  const [providerData, setProviderData] = useState<ProviderType | null>(null);
  const { id } = useParams();
  const { providersState } = useContext(StoreContext);

  useEffect(() => {
    const provider = providersState.data?.data.find((p) => {
      const _p = p as ProviderType;
      return _p.npi === id;
    }) as ProviderType;

    setProviderData(provider);
  }, []);

  if (!providerData) return <Box>No data to display</Box>;
  return (
    <>
      <Flex mb={5} justifyContent="flex-end">
        <Button as={RouterLink} to="/providers/results">
          Back
        </Button>
      </Flex>
      <Box p={5} bg={colors.backgroundPrimary} borderRadius={borderRadius.page}>
        <Heading as="h2" size="lg" color={colors.highlight}>
          {providerData?.first_name} {providerData?.last_name}
        </Heading>

        {/* Rating */}
        <Flex alignContent="center" margin="16px 0">
          <RatingStars
            rating={providerData.ratings_avg}
            ratingsCount={providerData?.ratings_count}
          />
        </Flex>

        <CardData
          label="Specialties:"
          value={providerData?.specialties
            ?.map((s: { provider_name: string }) => s.provider_name)
            .join(", ")}
        />
        <CardData
          label="Languages:"
          value={providerData?.languages?.join(", ")}
        />

        <CardData label="NPI:" value={providerData?.npi} />
        <CardData label="Age:" value={providerData?.age} />
        <CardData
          label="Primary care provider:"
          value={providerData?.is_pcp ? "yes" : "no"}
        />

        {providerData.clinical_areas?.length ? (
          <Box mt={5}>
            <Heading variant="h4">Clinical areas</Heading>
            {providerData.clinical_areas.map((ca) => (
              <Text key={ca.uuid}>{ca.display}</Text>
            ))}
          </Box>
        ) : null}
      </Box>

      <Box
        p={5}
        bg={colors.backgroundPrimary}
        borderRadius={borderRadius.page}
        mt={3}
      >
        <Tabs colorScheme={colors.colorScheme} p={1} flex={1}>
          <TabList>
            <Tab>Locations</Tab>
            <Tab>Insurances</Tab>
            <Tab>Procedures & treatment</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LocationList locations={providerData?.locations} />
            </TabPanel>

            <TabPanel>
              <InsuranceList
                insuranceList={providerData?.insurances?.sort((i1, i2) =>
                  i1.display_name.localeCompare(i2.display_name)
                )}
              />
            </TabPanel>
            <TabPanel>
              <ProviderProceduresAndTreatment
                treatments={providerData.treatments}
                procedures={providerData.procedures}
                conditions={providerData.conditions}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
export default Provider;
