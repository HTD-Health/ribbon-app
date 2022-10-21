import { Box, Flex, Text } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
interface InputWrapperProps {
  label?: any;
  error?: string | string[];
  children?: React.ReactNode;
}

const InputWrapper: FunctionComponent<InputWrapperProps> = ({
  label,
  error,
  children,
}) => {
  return (
    <Box flex={1}>
      <Text variant="label">{label}</Text>

      {children}

      {error && (
        <Flex direction="column" gap={2} mt={2} color="red.400" fontSize={12}>
          {Array.isArray(error) ? (
            error.map((e, i) => <Text key={`err_${i}`}>{e}</Text>)
          ) : (
            <Text>{error}</Text>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default InputWrapper;
