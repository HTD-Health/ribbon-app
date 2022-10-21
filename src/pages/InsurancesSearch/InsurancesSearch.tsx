import { Box, Button, Center, Flex, Input } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputWrapper from "../../components/ui/InputWrapper";
import { borderRadius, colors } from "../../utils/theme";
import InputBadgeDropdown from "../../components/ui/InputBadgeDropdown";
import states from "../../../data/usStates.json";
import { IdValue } from "../../types";
import { useInsurances } from "../../hooks/useInsurances";

type FormInputs = {
  search?: string;
  state?: string;
  plan_name?: string;
  plan_type?: string;
  category?: string;
  partial_codes?: string;
};

const formSchema = yup.object().shape({
  search: yup.string().label("Address"),
  state: yup.string().label("State"),
  plan_name: yup.string().label("Plan name"),
  plan_type: yup.string().label("Plan type"),
  category: yup.string().label("Category"),
  partial_codes: yup.string().label("Partial codes"),
});

interface InsurancesSearchProps {}

const InsurancesSearch: FunctionComponent<InsurancesSearchProps> = () => {
  const [selectedState, setSelectedState] = useState<IdValue[]>([]);
  const { fetchInsurances } = useInsurances();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    reset,
    resetField,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ resolver: yupResolver(formSchema) });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    fetchInsurances(data, () => navigate("/insurances/results"));
  };

  const onReset = () => {
    reset();
    setSelectedState([]);
  };

  const selectState = (id: string) => {
    const state = states.find((s) => s.id === id);
    if (!state) return;
    const updatedStateValue = selectedState[0]?.id === id ? [] : [state];
    setSelectedState(updatedStateValue);
    setValue("state", updatedStateValue[0]?.id);
    trigger("state");
  };

  register("state");

  return (
    <Box bg={colors.backgroundPrimary} borderRadius={borderRadius.page} p={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex p={0} gap={5} direction="column">
          <InputWrapper label="Address" error={errors.search?.message}>
            <Input
              type="text"
              isInvalid={!!errors.search?.message}
              {...register("search")}
              onBlur={async () => await trigger("search")}
            />
          </InputWrapper>
          <InputWrapper label="State" error={errors.state?.message}>
            <InputBadgeDropdown
              options={states}
              selectedOptions={selectedState}
              onSelect={selectState}
            />
          </InputWrapper>
          <InputWrapper label="Plan Name" error={errors.plan_name?.message}>
            <Input
              type="text"
              isInvalid={!!errors.plan_name?.message}
              {...register("plan_name")}
              onBlur={async () => await trigger("plan_name")}
            />
          </InputWrapper>
          <InputWrapper label="Plan Type" error={errors.plan_type?.message}>
            <Input
              type="text"
              isInvalid={!!errors.plan_type?.message}
              {...register("plan_type")}
              onBlur={async () => await trigger("plan_type")}
            />
          </InputWrapper>

          <InputWrapper label="Category" error={errors.category?.message}>
            <Input
              type="text"
              isInvalid={!!errors.category?.message}
              {...register("category")}
              onBlur={async ({
                target,
              }: React.ChangeEvent<HTMLInputElement>) => {
                await trigger("category");
                if (!target.value) resetField("partial_codes");
              }}
            />
          </InputWrapper>

          <InputWrapper
            label="Partial codes"
            error={errors.partial_codes?.message}
          >
            <Input
              type="text"
              isInvalid={!!errors.partial_codes?.message}
              {...register("partial_codes")}
              onBlur={async () => await trigger("partial_codes")}
              disabled={!!!getValues().category}
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

export default InsurancesSearch;
