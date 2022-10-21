import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NpiSearch from "./NpisSearch/NpisSearch";
import { borderRadius, colors } from "../../utils/theme";
import GeneralSearchTab from "./GeneralSearchTab/GeneralSearchTab";

const ProviderSearch = () => {
  return (
    <Box bg={colors.backgroundPrimary} borderRadius={borderRadius.page} p={5}>
      <Tabs>
        <TabList>
          <Tab>Basic</Tab>
          <Tab>Advanced</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <NpiSearch />
          </TabPanel>
          <TabPanel>{<GeneralSearchTab />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProviderSearch;
