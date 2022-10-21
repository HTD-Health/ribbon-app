import { FunctionComponent, useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Box, Button, Center, Flex, Input } from "@chakra-ui/react";
import InputWrapper from "../../components/ui/InputWrapper";
import { borderRadius, colors } from "../../utils/theme";
import InputBadgeDropdown from "../../components/ui/InputBadgeDropdown";
import { StoreContext } from "../../context/StoreContext";
import { IdValue } from "../../types";
import { useLocations } from "../../hooks/useLocations";
import { useTreatments } from "../../hooks/useTreatments";

type FormInputs = {
  treatment_ids: string[];
  address: string;
};

const formSchema = yup.object().shape({
  treatment_ids: yup.array().of(yup.string()).min(1).label("Treatments"),
  address: yup.string().required().label("Address"),
});

interface LocationsSearchProps {}

const LocationsSearch: FunctionComponent<LocationsSearchProps> = () => {
  const { treatmentsState } = useContext(StoreContext);
  const { fetchTreatments } = useTreatments();
  const { fetchLocations } = useLocations();
  const navigate = useNavigate();

  const [selectedTreatments, setSelectedTreatments] = useState<IdValue[]>([]);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      treatment_ids: [],
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    fetchLocations(data, () => navigate("/locations/results"));
  };

  const onReset = () => {
    reset();
    setSelectedTreatments([]);
  };

  const updateTreatmentsValue = (id: string) => {
    const treatment = treatmentsState.data?.results.find((s) => s.uuid === id);
    if (!treatment) return;

    const exist = selectedTreatments.find((c) => c.id === id);

    const updatedSpecs = exist
      ? selectedTreatments.filter((s) => s.id !== id)
      : [...selectedTreatments, { id, value: treatment.display }];

    setSelectedTreatments(updatedSpecs);
    setValue(
      "treatment_ids",
      updatedSpecs.map((s) => s.id)
    );
    trigger("treatment_ids");
  };

  const updateTreatmentsText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2)
      fetchTreatments({
        search: e.target.value,
      });
  };

  register("treatment_ids");

  return (
    <Box bg={colors.backgroundPrimary} borderRadius={borderRadius.page} p={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={5} direction="column">
          <InputWrapper label="Address" error={errors.address?.message}>
            <Input
              type="text"
              isInvalid={!!errors.address?.message}
              {...register("address")}
              onBlur={async () => await trigger("address")}
              onInput={async (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("address", e.target.value);
                trigger("address");
              }}
            />
          </InputWrapper>

          <InputWrapper
            label="Treatments"
            error={errors.treatment_ids?.message}
          >
            <InputBadgeDropdown
              onInput={updateTreatmentsText}
              onSelect={updateTreatmentsValue}
              options={treatmentsState.data?.results?.map((s) => ({
                id: s.uuid,
                value: s.display,
              }))}
              selectedOptions={selectedTreatments}
              isLoading={treatmentsState.loading}
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

export default LocationsSearch;
