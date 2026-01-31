import { useState } from "react";
import { RadioGroup as AriaRadioGroup } from "react-aria-components";
import { tv } from "tailwind-variants";

import { Description, FieldError, Label } from "../ui/Field";
import { Radio } from "../ui/RadioGroup";
import { TextField } from "../ui/TextField";

import { useFieldContext } from "./index";

const OTHER_VALUE = "other";

interface Option {
  label: string;
  value: string;
}

interface SelectOtherProps {
  label: string;
  options: readonly Option[];
  description?: string;
  orientation?: "horizontal" | "vertical";
  isDisabled?: boolean;
  otherLabel?: string;
}

const radioGroupStyles = tv({
  base: "flex gap-2",
  variants: {
    orientation: {
      horizontal: "flex-row flex-wrap",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export function SelectOther({
  label,
  options,
  description,
  orientation = "vertical",
  isDisabled = false,
  otherLabel = "Other",
}: SelectOtherProps) {
  const field = useFieldContext<string>();
  const optionValues = options.map((opt) => opt.value);

  const isKnownOption = optionValues.includes(field.state.value);

  const [otherSelected, setOtherSelected] = useState(
    () => field.state.value !== "" && !isKnownOption,
  );

  const isOtherMode = otherSelected || (!isKnownOption && field.state.value !== "");

  const radioValue = isKnownOption ? field.state.value : isOtherMode ? OTHER_VALUE : "";

  const handleRadioChange = (newValue: string) => {
    if (newValue === OTHER_VALUE) {
      setOtherSelected(true);
      field.handleChange("");
    } else {
      setOtherSelected(false);
      field.handleChange(newValue);
    }
  };

  const handleOtherTextChange = (text: string) => {
    field.handleChange(text);
  };

  const isOtherChecked = radioValue === OTHER_VALUE;

  return (
    <div className="flex flex-col gap-2">
      <AriaRadioGroup
        isInvalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
        isDisabled={isDisabled}
        value={radioValue}
        onChange={handleRadioChange}
        className="flex flex-col gap-2"
      >
        <Label>{label}</Label>
        <div className={radioGroupStyles({ orientation })}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
          <Radio value={OTHER_VALUE}>{otherLabel}</Radio>
        </div>
        <FieldError>{field.state.meta.errors.map((error) => error.message).join(", ")}</FieldError>
      </AriaRadioGroup>

      {isOtherChecked && (
        <TextField
          value={field.state.value}
          onChange={handleOtherTextChange}
          label="Please specify"
          aria-label="Specify other"
        />
      )}

      {description && <Description>{description}</Description>}
    </div>
  );
}
