import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface CardDataProps {
  label: string;
  value: string | number | null | undefined;
}
const CardData: FunctionComponent<CardDataProps> = ({ label, value }) => {
  return value && label ? (
    <Flex marginTop={1}>
      <Text width={200}>{label}</Text>
      <Text ml={2} flex={1}>
        {value || "-"}
      </Text>
    </Flex>
  ) : null;
};

export default CardData;
