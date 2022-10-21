import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import InputWrapper from "../../components/ui/InputWrapper";
import { borderRadius, colors, fontSize } from "../../utils/theme";
import InputBadgeDropdown from "../../components/ui/InputBadgeDropdown";
import { StoreContext } from "../../context/StoreContext";
import { IdValue } from "../../types";
import { useConditions } from "../../hooks/useConditions";
import { useConditionCostEstimate } from "../../hooks/useConditionCostEstimate";
import { Gender } from "ribbon-client";

type FormInputs = {
  condition_ids: string[];
  member_age: number;
  member_zip: string;
  member_gender: Gender;
};

const formSchema = yup.object().shape({
  condition_ids: yup.array().of(yup.string()).min(1).label("Conditions"),
  member_age: yup.string().required().label("Age"),
  member_gender: yup.string().required().label("Gender"),
  member_zip: yup.string().required().label("Zip code"),
});

interface ConditionCostEstimateProps {}

const ConditionCostEstimate: FunctionComponent<
  ConditionCostEstimateProps
> = () => {
  const { conditionsState } = useContext(StoreContext);
  const { fetchConditions } = useConditions();
  const { fetchConditionCostEstimate } = useConditionCostEstimate();
  const navigate = useNavigate();

  const [selectedConditions, setSelectedConditions] = useState<IdValue[]>([]);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      member_age: 45,
      member_gender: "m",
      member_zip: "",
      condition_ids: [],
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    fetchConditionCostEstimate(data, () =>
      navigate("/condition_cost_estimate/results")
    );
  };

  const onReset = () => {
    reset();
    setSelectedConditions([]);
  };

  const updateConditionsValue = (id: string) => {
    const specialty = conditionsState.data?.results.find((s) => s.uuid === id);
    if (!specialty) return;

    const exist = selectedConditions.find((c) => c.id === id);

    const updatedSpecs = exist
      ? selectedConditions.filter((s) => s.id !== id)
      : [...selectedConditions, { id, value: specialty.display }];

    setSelectedConditions(updatedSpecs);
    setValue(
      "condition_ids",
      updatedSpecs.map((s) => s.id)
    );
    trigger("condition_ids");
  };

  const updateConditionsText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2)
      fetchConditions({
        search: e.target.value,
        module: "condition_cost_estimate",
      });
  };

  register("member_age");

  return (
    <Box bg={colors.backgroundPrimary} borderRadius={borderRadius.page} p={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={5} direction="column">
          <InputWrapper label="Gender" error={errors.member_gender?.message}>
            <RadioGroup
              onChange={(value: Gender) => {
                setValue("member_gender", value);
                trigger("member_age");
              }}
              value={getValues("member_gender")}
            >
              <Stack p={2} gap={2}>
                <Radio value="m">Male</Radio>
                <Radio value="f">Female</Radio>
              </Stack>
            </RadioGroup>
          </InputWrapper>

          <InputWrapper label="Zip Code" error={errors.member_zip?.message}>
            <Input
              type="text"
              isInvalid={!!errors.member_zip?.message}
              {...register("member_zip")}
              onBlur={async () => trigger("member_zip")}
              onInput={async (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("member_zip", e.target.value);
                trigger("member_zip");
              }}
            />
          </InputWrapper>

          <InputWrapper label="Age" error={errors.member_age?.message}>
            <Flex p={2}>
              <Slider
                defaultValue={45}
                min={0}
                max={125}
                step={1}
                onChange={(value) => {
                  setValue("member_age", value);
                  trigger("member_age");
                }}
                value={getValues("member_age")}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>

                <SliderMark value={0} mt="1" ml="-0.5" fontSize="sm">
                  <Text fontSize={fontSize.textMin}>0</Text>
                </SliderMark>
                <SliderMark value={25} mt="1" ml="" fontSize="sm">
                  <Text fontSize={fontSize.textMin}>25</Text>
                </SliderMark>
                <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
                  <Text fontSize={fontSize.textMin}>50</Text>
                </SliderMark>
                <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
                  <Text fontSize={fontSize.textMin}>75</Text>
                </SliderMark>
                <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
                  <Text fontSize={fontSize.textMin}>100</Text>
                </SliderMark>
                <SliderMark value={125} mt="1" ml="-2.5" fontSize="sm">
                  <Text fontSize={fontSize.textMin}>125</Text>
                </SliderMark>

                <Tooltip
                  hasArrow
                  bg="blue.500"
                  color="white"
                  placement="top"
                  label={getValues("member_age")}
                >
                  <SliderThumb />
                </Tooltip>
              </Slider>
            </Flex>
          </InputWrapper>

          <InputWrapper
            label="Conditions"
            error={errors.condition_ids?.message}
          >
            <InputBadgeDropdown
              onInput={updateConditionsText}
              onSelect={updateConditionsValue}
              options={conditionsState.data?.results?.map((s) => ({
                id: s.uuid,
                value: s.display,
              }))}
              selectedOptions={selectedConditions}
              isLoading={conditionsState.loading}
            />
          </InputWrapper>

          <Center gap={2} mt={5}>
            <Button variant="outline" onClick={onReset}>
              Reset
            </Button>

            <Button disabled={!isValid} type="submit">
              Search
            </Button>
          </Center>
        </Flex>
      </form>
    </Box>
  );
};

export default ConditionCostEstimate;
