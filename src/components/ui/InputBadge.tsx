import { SmallCloseIcon } from "@chakra-ui/icons";
import { Badge, Box, Input, Wrap, WrapItem } from "@chakra-ui/react";
import React, {
  FunctionComponent,
  HTMLInputTypeAttribute,
  useState,
} from "react";
import InputWrapper from "./InputWrapper";

interface InputBadgeProps {
  values: string[];
  validation?: {};
  type?: HTMLInputTypeAttribute;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => boolean | undefined;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => boolean | undefined;
  onBadgeClick?: (item: string) => void;
}

interface IInputForm {
  value: string;
  error?: string[] | undefined;
}

const initialFormValues: IInputForm = {
  value: "",
  error: undefined,
};

const InputBadge: FunctionComponent<InputBadgeProps> = ({
  values,
  validation,
  type,

  onInput,
  onBlur,
  onKeyDown,
  onBadgeClick,
}) => {
  const [form, setForm] = useState<IInputForm>(initialFormValues);

  return (
    <Box>
      <InputWrapper error={form?.error}>
        <Input
          type={type || "text"}
          value={form.value}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (onInput) onInput(e);
            const error = undefined;
            setForm({ value: e.target.value, error });
          }}
          onBlur={(e) => {
            // resets input if returned value is true
            if (!form.error && onBlur && onBlur(e)) setForm(initialFormValues);
          }}
          onKeyDown={(e) => {
            if (!form.error && onKeyDown && onKeyDown(e))
              setForm(initialFormValues);
          }}
        />
      </InputWrapper>

      <Wrap pt={2}>
        {values.map((v, i) => (
          <WrapItem key={`badge-${i}`}>
            <Badge
              colorScheme="blue"
              p={1}
              onClick={onBadgeClick ? () => onBadgeClick(v) : undefined}
              cursor="pointer"
            >
              {v}
              <SmallCloseIcon ml={1} />
            </Badge>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default InputBadge;
