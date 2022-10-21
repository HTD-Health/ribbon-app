import {
  Button,
  Center,
  Flex,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { FunctionComponent, useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputWrapper from "../../../components/ui/InputWrapper";
import InputBadgeDropdown from "../../../components/ui/InputBadgeDropdown";
import { IdValue } from "../../../types";
import { StoreContext } from "../../../context/StoreContext";
import { useLanguages } from "../../../hooks/useLanguages";
import { useProviders } from "../../../hooks/useProviders";
import { useSpecialties } from "../../../hooks/useSpecialties";
import { useConditions } from "../../../hooks/useConditions";
import { Language } from "ribbon-client";
import { fontSize } from "../../../utils/theme";

type FormInputs = {
  address: string;
  condition_ids: string[];
  specialties: string;
  language: string;
  min_age: number;
  max_age: number;
  min_rating: number;
  min_outcomes_index: number;
  min_efficiency_index: number;
};

const formSchema = yup.object().shape({
  address: yup.string().label("Address"),
  condition_ids: yup.array().of(yup.string()).label("Conditions"),
  specialties: yup.string().label("Specialties"),
  language: yup.string().label("Language"),
  min_age: yup.number().min(18).max(120).optional().label("Minimum age"),
  max_age: yup.number().min(18).max(120).optional().label("Maximum age"),
  min_rating: yup.number().min(1).max(10).optional().label("Minimum rating"),
  min_outcomes_index: yup
    .number()
    .min(1)
    .max(5)
    .optional()
    .label("Minimal outcomes quality"),
  min_efficiency_index: yup
    .number()
    .min(1)
    .max(5)
    .optional()
    .label("Minimal cost efficiency"),
});

interface GeneralSearchTabProps {}

const GeneralSearchTab: FunctionComponent<GeneralSearchTabProps> = () => {
  const { conditionsState } = useContext(StoreContext);
  const { specialtiesState, languagesState } = useContext(StoreContext);
  const { fetchConditions } = useConditions();
  const { fetchLanguages } = useLanguages();
  const { fetchProviders } = useProviders();
  const { fetchSpecialties } = useSpecialties();
  const navigate = useNavigate();

  const [languageValue, setLanguageValue] = useState<IdValue[]>([]);
  const [specialtiesValue, setSpecialtiesValue] = useState<IdValue[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<IdValue[]>([]);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    reset,
    resetField,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      min_age: 18,
      max_age: 100,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    fetchProviders(data, () => navigate("/providers/results"));
  };

  const onReset = () => {
    reset();
    setLanguageValue([]);
    setSpecialtiesValue([]);
  };

  const updateSpecialtiesValue = (id: string) => {
    const specialty = specialtiesState.data?.results.find((s) => s.uuid === id);
    if (!specialty) return;

    const exist = specialtiesValue.find((s) => s.id === id);

    const updatedSpecs = exist
      ? specialtiesValue.filter((s) => s.id !== id)
      : [...specialtiesValue, { id, value: specialty.display }];

    setSpecialtiesValue(updatedSpecs);
    setValue("specialties", updatedSpecs.map((s) => s.id).join(","));
  };

  const updateSpecialtiesText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) fetchSpecialties({ search: e.target.value });
  };

  const updateLanguageValue = (id: string) => {
    const language = languagesState.data?.data.find((s) => s.uuid === id);
    if (!language) return;

    const updatedLangs = !!languageValue.find((s) => s.id === id)
      ? languageValue.filter((s) => s.id !== id)
      : [{ id, value: language.display_name }];

    setLanguageValue(updatedLangs);
    setValue("language", updatedLangs.map((s) => s.value).join(","));
  };

  const updateLanguageText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) fetchLanguages({ search: e.target.value });
  };

  const setOptionalNumberField = async (
    field: keyof FormInputs,
    text: string
  ) => {
    const value = Number(text);
    if (!text) resetField(field);
    else setValue(field, value);
    await trigger(field);
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
      });
  };

  register("condition_ids");
  register("specialties");
  register("language");
  register("min_age");
  register("max_age");
  register("min_rating");
  register("min_outcomes_index");
  register("min_efficiency_index");

  const ageErrors = [];
  if (errors.max_age?.message) ageErrors.push(errors.max_age.message);
  if (errors.min_age?.message) ageErrors.push(errors.min_age.message);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex p={0} gap={5} direction="column">
        <InputWrapper label="Address" error={errors.address?.message}>
          <Input
            type="text"
            isInvalid={!!errors.address?.message}
            {...register("address")}
            onBlur={async () => await trigger("address")}
          />
        </InputWrapper>

        <InputWrapper label="Specialties">
          <InputBadgeDropdown
            onInput={updateSpecialtiesText}
            onSelect={updateSpecialtiesValue}
            options={specialtiesState.data?.results?.map((s) => ({
              id: s.uuid,
              value: s.display,
            }))}
            selectedOptions={specialtiesValue}
            isLoading={specialtiesState.loading}
          />
        </InputWrapper>

        <InputWrapper label="Language">
          <InputBadgeDropdown
            onInput={updateLanguageText}
            onSelect={updateLanguageValue}
            options={languagesState.data?.data?.map((l: Language) => ({
              id: l.uuid,
              value: l.display_name,
            }))}
            selectedOptions={languageValue}
            isLoading={languagesState.loading}
          />
        </InputWrapper>

        <InputWrapper label="Minimum Rating" error={errors.min_rating?.message}>
          <Flex p={2}>
            <Slider
              min={0}
              max={10}
              step={1}
              onChange={(value) => {
                if (value === 0) return resetField("min_rating");
                setValue("min_rating", value);
                trigger("min_rating");
              }}
              value={getValues("min_rating") || 0}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>

              <SliderMark value={1} mt="1" ml="-0.5" fontSize="sm">
                <Text fontSize={fontSize.textMin}>1</Text>
              </SliderMark>
              <SliderMark value={10} mt="1" ml="-2.5" fontSize="sm">
                <Text fontSize={fontSize.textMin}>10</Text>
              </SliderMark>

              <Tooltip
                hasArrow
                bg="blue.500"
                color="white"
                placement="top"
                label={getValues("min_rating")}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </Flex>
        </InputWrapper>

        <InputWrapper label="Age" error={ageErrors}>
          <Flex p={2}>
            <RangeSlider
              aria-label={["min", "max"]}
              defaultValue={[18, 120]}
              min={18}
              max={120}
              onChange={([minAge, maxAge]) => {
                setValue("min_age", minAge);
                trigger("min_age");

                setValue("max_age", maxAge);
                trigger("max_age");
              }}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>

              <Tooltip
                hasArrow
                bg="blue.500"
                color="white"
                placement="top"
                label={getValues("min_age")}
              >
                <RangeSliderThumb index={0} />
              </Tooltip>

              <Tooltip
                hasArrow
                bg="blue.500"
                color="white"
                placement="top"
                label={getValues("max_age")}
              >
                <RangeSliderThumb index={1} />
              </Tooltip>

              <RangeSliderMark value={18} mt="1" ml="-0.5" fontSize="sm">
                <Text fontSize={fontSize.textMin}>18</Text>
              </RangeSliderMark>
              <RangeSliderMark value={120} mt="1" ml="-2.5" fontSize="sm">
                <Text fontSize={fontSize.textMin}>120</Text>
              </RangeSliderMark>
            </RangeSlider>
          </Flex>
        </InputWrapper>

        <Flex gap={3}>
          <InputWrapper
            label="Minimal Outcomes Quality"
            error={errors.min_outcomes_index?.message}
          >
            <Flex p={2}>
              <Slider
                min={0}
                max={5}
                step={1}
                onChange={(value) => {
                  if (value === 0) return resetField("min_outcomes_index");
                  setValue("min_outcomes_index", value);
                  trigger("min_outcomes_index");
                }}
                value={getValues("min_outcomes_index") || 0}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>

                <SliderMark value={1} mt="1" ml="-0.5" fontSize="sm">
                  <Text fontSize={fontSize.textMin}>1</Text>
                </SliderMark>
                <SliderMark value={5} mt="1" ml="-2.5" fontSize="sm">
                  <Text fontSize={fontSize.textMin}>5</Text>
                </SliderMark>

                <Tooltip
                  hasArrow
                  bg="blue.500"
                  color="white"
                  placement="top"
                  label={getValues("min_outcomes_index")}
                >
                  <SliderThumb />
                </Tooltip>
              </Slider>
            </Flex>
          </InputWrapper>

          <InputWrapper
            label="Minimal Cost Efficiency"
            error={errors.min_efficiency_index?.message}
          >
            <Flex p={2}>
              <Slider
                min={0}
                max={5}
                step={1}
                onChange={(value) => {
                  if (value === 0) return resetField("min_efficiency_index");
                  setValue("min_efficiency_index", value);
                  trigger("min_efficiency_index");
                }}
                value={getValues("min_efficiency_index") || 0}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>

                <SliderMark value={1} mt="1" ml="-0.5" fontSize="sm">
                  <Text fontSize={fontSize.textMin}>1</Text>
                </SliderMark>
                <SliderMark value={5} mt="1" ml="-2.5" fontSize="sm">
                  <Text fontSize={fontSize.textMin}>5</Text>
                </SliderMark>

                <Tooltip
                  hasArrow
                  bg="blue.500"
                  color="white"
                  placement="top"
                  label={getValues("min_efficiency_index")}
                >
                  <SliderThumb />
                </Tooltip>
              </Slider>
            </Flex>
            <RangeSlider />
          </InputWrapper>
        </Flex>

        <InputWrapper label="Conditions" error={errors.condition_ids?.message}>
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
  );
};

export default GeneralSearchTab;
