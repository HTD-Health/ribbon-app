import { ArrowUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import useWindowScroll, { ScrollObject } from "../../hooks/useWindowScroll";

interface ScrollTopButtonProps {}

const ScrollTopButton: FunctionComponent<ScrollTopButtonProps> = () => {
  const [buttonVisible, setButtonVisible] = useState(false);

  useWindowScroll((scroll: ScrollObject) => {
    if (scroll.y >= 60) setButtonVisible(true);
    else setButtonVisible(false);
  });

  return buttonVisible ? (
    <IconButton
      icon={<ArrowUpIcon />}
      aria-label="Scroll to top"
      position="fixed"
      bottom="48px"
      right="32px"
      borderRadius="50%"
      size="md"
      onClick={() => window.scrollTo(0, 0)}
    />
  ) : null;
};

export default ScrollTopButton;
