import { HStack, Link, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";

interface NavBarLinkProps {
  children?: React.ReactNode;
  text?: string;
  to: string;
}

const NavBarLink: FunctionComponent<NavBarLinkProps> = ({
  children,
  text,
  to,
}) => {
  return children ? (
    <Link as={RouterLink} to={to} textDecoration="none">
      <HStack>
        <Text fontSize="10pt">{text}</Text>
        {children}
      </HStack>
    </Link>
  ) : (
    <Link as={RouterLink} to={to} textDecoration="none">
      <Text fontSize="10pt">{text}</Text>
    </Link>
  );
};

export default NavBarLink;
