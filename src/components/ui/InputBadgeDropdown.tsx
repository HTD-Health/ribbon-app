import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Checkbox,
  Input,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { IdValue } from "../../types";
import { borderRadius, colors } from "../../utils/theme";
import Spinner from "./Spinner";

interface InputBadgeDropdownProps {
  options?: IdValue[];
  selectedOptions?: IdValue[];
  isLoading?: boolean;
  optionsCount?: number;

  onSelect?: (id: string) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBadgeDropdown: FunctionComponent<InputBadgeDropdownProps> = ({
  options = [],
  selectedOptions = [],
  onSelect,
  onInput,
  isLoading,
  optionsCount = 5,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const filteredItems = options
    .filter((l) => l.value.toLowerCase().includes(inputValue.toLowerCase()))
    .slice(0, optionsCount);

  return (
    <Box>
      <Box
        position="relative"
        onMouseLeave={
          dropdownVisible
            ? () => {
                setDropdownVisible(false);
              }
            : undefined
        }
      >
        <Input
          type="text"
          value={inputValue}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            if (onInput) onInput(e);
            setDropdownVisible(true);
          }}
          onClick={() => setDropdownVisible(true)}
        />
        {dropdownVisible && (
          <Stack
            bg={colors.backgroundPrimary}
            borderRadius={borderRadius.dropdown}
            p={4}
            position="absolute"
            zIndex={1}
            boxShadow="0 2px 4px #0004"
            width="100%"
            top="100%"
          >
            {isLoading ? (
              <Spinner />
            ) : filteredItems?.length > 0 ? (
              filteredItems.map((l) => {
                const isChecked = !!selectedOptions?.find((d) => d.id === l.id);
                return (
                  <Checkbox
                    key={l.id}
                    isChecked={isChecked}
                    onInput={onSelect ? () => onSelect(l.id) : undefined}
                  >
                    <Text variant="dropdownLabel">{l.value}</Text>
                  </Checkbox>
                );
              })
            ) : (
              <Text color={colors.textFaded}>No items to show</Text>
            )}
          </Stack>
        )}
      </Box>
      {!!selectedOptions?.length && (
        <Wrap p={2}>
          {selectedOptions.map((i) => (
            <WrapItem key={i.id}>
              <Badge
                colorScheme="blue"
                p={1}
                onClick={onSelect ? () => onSelect(i.id) : undefined}
                cursor="pointer"
              >
                {i.value}
                <SmallCloseIcon ml={1} />
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Box>
  );
};

export default InputBadgeDropdown;
