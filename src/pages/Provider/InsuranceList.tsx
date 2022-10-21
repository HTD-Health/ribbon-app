import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { Insurance } from "ribbon-client";
import CardData from "../../components/CardData/CardData";
import { borderRadius, colors } from "../../utils/theme";
import { extractValuesToString } from "../../utils/utils";

interface InsuranceListProps {
  insuranceList?: Insurance[];
}

const InsuranceList: FunctionComponent<InsuranceListProps> = ({
  insuranceList,
}) => {
  const [searchString, setSearchString] = useState("");

  const filteredList = insuranceList?.filter((i) => {
    if (searchString === "") return true;
    const _string = extractValuesToString(i).toLowerCase();
    let match = true;
    for (let s of searchString.toLowerCase().split(" "))
      match = match && _string.includes(s);
    return match;
  });

  return (
    <Flex gap={3} direction="column">
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

      {filteredList?.map((insurance) => (
        <Box
          key={insurance.uuid}
          border="1px"
          borderColor={colors.borderFaded}
          borderRadius={borderRadius.card}
          p={3}
        >
          <Text variant="label" marginBottom={2}>
            {insurance.plan_name}
          </Text>
          <CardData label={"Carrier name:"} value={insurance?.carrier_name} />
          {insurance?.codes && insurance?.codes.length > 0 && (
            <CardData label={"Codes:"} value={insurance.codes.join(", ")} />
          )}
          {insurance?.network && (
            <CardData label={"Network:"} value={insurance.network} />
          )}
          {insurance?.plan_type && (
            <CardData label={"Plan type:"} value={insurance.plan_type} />
          )}
        </Box>
      ))}
    </Flex>
  );
};

export default InsuranceList;
