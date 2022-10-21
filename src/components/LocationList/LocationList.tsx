import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { Location } from "ribbon-client";
import { borderRadius, colors, fontSize } from "../../utils/theme";
import { extractValuesToString } from "../../utils/utils";
import CardData from "../CardData/CardData";
import LocationMap from "./LocationMap";

interface LocationListProps {
  locations?: Location[];
}

const LocationList: FunctionComponent<LocationListProps> = ({ locations }) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );

  const [searchString, setSearchString] = useState("");

  const filteredList = locations?.filter((i) => {
    if (searchString === "") return true;
    const _string = extractValuesToString(i).toLowerCase();
    let match = true;
    for (let s of searchString.toLowerCase().split(" "))
      match = match && _string.includes(s);
    return match;
  });

  return (
    <Flex direction="column" gap={3} mr={3} overflowY="auto">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color={colors.textFaded} />}
        />
        <Input
          type="text"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchString(e.target?.value);
          }}
          value={searchString}
        />
        <IconButton
          ml={2}
          aria-label="Clear Input"
          icon={<SmallCloseIcon />}
          onClick={() => setSearchString("")}
        />
      </InputGroup>

      {filteredList?.map((location) => (
        <Box
          key={location.uuid}
          border="1px"
          borderColor={colors.borderFaded}
          borderRadius={borderRadius.card}
          p={3}
        >
          <Heading
            as="h3"
            color={colors.highlight}
            fontSize={fontSize.h3}
            marginBottom={2}
          >
            {location.name}
          </Heading>
          <Box>
            <Text>{location.address}</Text>
            <CardData label="Address" value={location.address} />
            <CardData
              label="Types"
              value={location.location_types.join(", ")}
            />
            <CardData
              label="Phone numbers"
              value={location.phone_numbers
                .map(
                  (pn) => `${pn.phone}${pn?.details === "primary" ? "(P)" : ""}`
                )
                .join(", ")}
            />

            {selectedLocationId === location.uuid && (
              <LocationMap location={location} />
              // <></>
            )}

            <Flex mt={3} justifyContent="flex-end" gap={2}>
              <Button
                variant="outline"
                onClick={() =>
                  setSelectedLocationId(
                    selectedLocationId === location.uuid ? null : location.uuid
                  )
                }
              >
                {selectedLocationId === location.uuid ? "Hide Map" : "Show map"}
              </Button>
              <Button
                as={Link}
                variant="outline"
                href={location.google_maps_link}
                isExternal
              >
                Google Maps
              </Button>
            </Flex>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default LocationList;
