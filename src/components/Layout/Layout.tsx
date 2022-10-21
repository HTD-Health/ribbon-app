import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import InsurancesSearchResults from "../../pages/InsurancesSearchResults/InsurancesSearchResults";
import InsurancesSearch from "../../pages/InsurancesSearch/InsurancesSearch";
import Page404 from "../../pages/Page404/Page404";
import Provider from "../../pages/Provider/Provider";
import ProviderSearch from "../../pages/ProviderSearch/ProviderSearch";
import ProviderSearchResults from "../../pages/ProviderSearchResults/ProviderSearchResults";
import theme, { colors } from "../../utils/theme";
import Footer from "../Footer";
import Header from "../Header/Header";
import Sidemenu from "../Sidemenu/Sidemenu";
import ScrollTopButton from "./ScrollTopButton";
import ConditionCostEstimate from "../../pages/ConditionCostEstimate/ConditionCostEstimate";
import ConditionCostEstimateResults from "../../pages/ConditionCostEstimate/ConditionCostEstimateResults";
import LocationsSearch from "../../pages/LocationsSearch/LocationsSearch";
import LocationsSearchResults from "../../pages/LocationsSearchResults/LocationsSearchResults";

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = () => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Sidemenu />
      <Box bg={colors.backgroundSecondary} pt={90} pb={10} minH={600}>
        <Container p={0} maxW="4xl">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/condition_cost_estimate/search"
              element={<ConditionCostEstimate />}
            />
            <Route
              path="/condition_cost_estimate/results"
              element={<ConditionCostEstimateResults />}
            />

            <Route path="/locations/search" element={<LocationsSearch />} />
            <Route
              path="/locations/results"
              element={<LocationsSearchResults />}
            />

            <Route path="/providers/search" element={<ProviderSearch />} />
            <Route
              path="/providers/results"
              element={<ProviderSearchResults />}
            />
            <Route path="/providers/:id" element={<Provider />} />

            <Route path="/insurances/search" element={<InsurancesSearch />} />
            <Route
              path="/insurances/results"
              element={<InsurancesSearchResults />}
            />

            <Route path="*" element={<Page404 />} />
          </Routes>
        </Container>
      </Box>
      <ScrollTopButton />
      <Footer />
    </ChakraProvider>
  );
};

export default Layout;
