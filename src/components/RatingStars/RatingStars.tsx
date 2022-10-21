import { StarIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { colors } from "../../utils/theme";

interface RatingStarsProps {
  rating?: number;
  ratingsCount?: number | undefined;
  scale?: number;
  maxRating?: number;
}

const RatingStars: FunctionComponent<RatingStarsProps> = ({
  rating = 0,
  scale = 5,
  ratingsCount,
  maxRating = 10,
}) => {
  const ratio = scale / maxRating;
  const roundedRating = rating > maxRating ? maxRating : Math.round(rating);
  const scaledRating = roundedRating * ratio;

  return typeof ratingsCount === "number" && ratingsCount > 0 ? (
    <>
      <Flex gap={1} alignItems="center">
        {Array(scale)
          .fill(scaledRating)
          .map((r, i) => {
            let color = colors.textFaded;
            if (r >= i + 1) color = colors.highlight;
            else if (r >= i + ratio) color = colors.highlightDark;
            return <StarIcon key={`star_${i}`} boxSize={3} color={color} />;
          })}
      </Flex>
      <Text textAlign="center" marginLeft={1} color={colors.textFaded}>
        ({ratingsCount})
      </Text>
    </>
  ) : (
    <Text color={colors.textFaded}>No rating yet</Text>
  );
};

export default RatingStars;
