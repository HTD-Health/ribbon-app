import { Center, CircularProgress } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { colors } from "../../utils/theme";

interface SpinnerProps {}

const Spinner: FunctionComponent<SpinnerProps> = () => {
  return (
    <Center>
      <CircularProgress
        isIndeterminate
        color={colors.highlight}
        margin="auto"
        size={8}
      />
    </Center>
  );
};

export default Spinner;
