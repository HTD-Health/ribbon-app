import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputBadge from "../../../components/ui/InputBadge";
import InputWrapper from "../../../components/ui/InputWrapper";
import { useProviders } from "../../../hooks/useProviders";
import { useState } from "react";

type FormInputs = {
  npis: string[];
};

const formSchema = yup.object().shape({
  npis: yup.array().of(yup.string()).min(1).label("Npis"),
});

const NpisSearch = () => {
  const { fetchProviders } = useProviders();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ resolver: yupResolver(formSchema) });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    fetchProviders(data, () => navigate("/providers/results"));
  };

  const onReset = () => {
    reset();
    setNpisValue([]);
  };

  const [npisValue, setNpisValue] = useState<string[]>([]);

  const addNpi = (value: string) => {
    const _values = Array.from(
      new Set([...value.replace(/([,. ]+)/g, " ").split(" "), ...npisValue])
    )
      .filter((npi) => {
        const v = npi.trim();
        if (Number.isNaN(Number(v))) return false;
        if (v.length === 0) return false;
        return v;
      })
      .sort((a, b) => a.localeCompare(b));

    setNpisValue(_values);
    setValue("npis", _values);
    trigger("npis");
  };

  const removeNpi = (value: string) => {
    const _values = npisValue?.filter((npi: string) => npi !== value);
    setNpisValue(_values);
    setValue("npis", _values);
    trigger("npis");
  };

  register("npis");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <InputWrapper label="Npis" error={errors.npis?.message}>
          <InputBadge
            values={npisValue}
            onBlur={({ target }) => {
              addNpi(target.value);
              return true;
            }}
            type="number"
            onKeyDown={({ target, key }) => {
              if (key === "Enter" || key === "," || key === " ") {
                const _target = target as HTMLInputElement;
                addNpi(_target.value);
                _target.value = "";
                return true;
              }
            }}
            onBadgeClick={removeNpi}
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
      </Box>
    </form>
  );
};

export default NpisSearch;
