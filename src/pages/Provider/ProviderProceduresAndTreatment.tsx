import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { UuidDisplay } from "ribbon-client";

import { colors } from "../../utils/theme";

interface ProviderProceduresAndTreatmentProps {
  procedures?: UuidDisplay[];
  conditions?: UuidDisplay[];
  treatments?: UuidDisplay[];
}

const ProviderProceduresAndTreatment: FunctionComponent<
  ProviderProceduresAndTreatmentProps
> = ({ procedures, conditions, treatments }) => {
  const _procedures = procedures?.length ? (
    <Box mt={5}>
      <Heading variant="h4">Procedures</Heading>
      {procedures.map((p) => (
        <Text key={p.uuid}>{p.display}</Text>
      ))}
    </Box>
  ) : null;

  const _conditions = conditions?.length ? (
    <Box mt={5}>
      <Heading variant="h4">Conditions</Heading>
      {conditions.map((c) => (
        <Text key={c.uuid}>{c.display}</Text>
      ))}
    </Box>
  ) : null;

  const _treatments = treatments?.length ? (
    <Box mt={5}>
      <Heading variant="h4">Treatments</Heading>
      {treatments.map((t) => (
        <Text key={t.uuid}>{t.display}</Text>
      ))}
    </Box>
  ) : null;

  if (!_procedures && !_conditions && !_treatments)
    return <Text color={colors.textFaded}>No data to display</Text>;

  return (
    <Stack gap={5}>
      {_procedures}
      {_conditions}
      {_treatments}
    </Stack>
  );
};

export default ProviderProceduresAndTreatment;
