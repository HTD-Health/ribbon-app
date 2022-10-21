import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

export const colors = {
  backgroundPrimary: "gray.50",
  backgroundSecondary: "gray.100",
  colorScheme: "orange",
  text: "gray.600",
  textFaded: "gray.400",
  borderFaded: "gray.200",
  highlight: "orange.400",
  highlightDark: "orange.600",
  highlightContrast: "blue.400",
  highlightContrastDark: "blue.600",
  dropdown: "gray.50",
};

export const fontSize = {
  h1: 24,
  h2: 20,
  h3: 18,
  h4: 16,
  text: 14,
  textMin: 12,
};

export const borderRadius = {
  page: 8,
  dropdown: 4,
  badge: 4,
  card: 8,
  input: 32,
  button: 32,
};

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: borderRadius.button,
  },
  variants: {
    solid: {
      bg: colors.highlight,
    },
  },
  defaultProps: {
    size: "sm",
    colorScheme: colors.colorScheme,
    bg: colors.highlight,
  },
};

const Input: ComponentStyleConfig = {
  variants: {
    outline: {
      field: {
        borderRadius: borderRadius.input,
      },
    },
  },
  defaultProps: {
    size: "sm",
    variant: "flushed",
  },
};

const Tabs: ComponentStyleConfig = {
  defaultProps: {
    size: "sm",
    colorScheme: colors.colorScheme,
  },
};

const Heading: ComponentStyleConfig = {
  variants: {
    h1: {
      color: colors.highlight,
      fontSize: fontSize.h1,
      paddingBottom: 2,
    },
    h2: {
      color: colors.highlight,
      fontSize: fontSize.h2,
      paddingBottom: 2,
    },
    h3: {
      color: colors.highlight,
      fontSize: fontSize.h3,
      paddingBottom: 2,
    },
    h4: {
      color: colors.highlight,
      fontSize: fontSize.h4,
      paddingBottom: 2,
    },
  },
};

const Text: ComponentStyleConfig = {
  variants: {
    label: {
      color: colors.highlight,
      fontSize: fontSize.text,
      fontWeight: "medium",
    },
    dropdownLabel: {
      fontSize: fontSize.text,
    },
  },
};

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: colors.backgroundPrimary,
        color: colors.text,
        fontSize: fontSize.text,
      },
    }),
  },
  components: {
    Button,
    Input,
    Heading,
    Tabs,
    Text,
  },
});
export default theme;
