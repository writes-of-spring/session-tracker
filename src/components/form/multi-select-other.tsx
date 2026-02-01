import { CheckboxGroup as AriaCheckboxGroup } from "react-aria-components";
import { tv } from "tailwind-variants";
import { Checkbox } from "../ui/Checkbox";
import { Description, FieldError, Label } from "../ui/Field";
import { TextField } from "../ui/TextField";
import { useFieldContext } from "./index";

const OTHER_VALUE = "other";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectOtherProps {
  label: string;
  options: readonly Option[];
  description?: string;
  columns?: 1 | 2 | 3 | 4;
  isDisabled?: boolean;
  exclusiveOptions?: string[];
}

const gridStyles = tv({
  base: "grid gap-2",
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 1,
  },
});

export function MultiSelectOther({
  label,
  options,
  description,
  columns = 1,
  isDisabled = false,
  exclusiveOptions = [],
}: MultiSelectOtherProps) {
  const field = useFieldContext<string[]>();
  const optionValues = options.map((opt) => opt.value);
  const allKnownValues = [...optionValues, OTHER_VALUE];

  const customOtherText = field.state.value.find((item: string) => !allKnownValues.includes(item));

  const checkboxGroupValue = [
    ...field.state.value.filter((item: string) => optionValues.includes(item)),
    ...(customOtherText !== undefined ? [OTHER_VALUE] : []),
  ];

  const handleCheckboxGroupChange = (newValues: string[]) => {
    const wasOtherChecked = checkboxGroupValue.includes(OTHER_VALUE);
    const isOtherNowChecked = newValues.includes(OTHER_VALUE);

    let standardValues = newValues.filter((v) => v !== OTHER_VALUE);

    if (exclusiveOptions.length > 0) {
      const prevValue = checkboxGroupValue.filter((v) => v !== OTHER_VALUE);
      const prevExclusives = prevValue.filter((v) => exclusiveOptions.includes(v));
      const newExclusives = standardValues.filter((v) => exclusiveOptions.includes(v));

      const addedExclusive = newExclusives.find((v) => !prevExclusives.includes(v));

      if (addedExclusive) {
        standardValues = [addedExclusive];
        field.handleChange([addedExclusive]);
        return;
      } else if (
        prevExclusives.length > 0 &&
        (standardValues.length > prevExclusives.length || isOtherNowChecked)
      ) {
        standardValues = standardValues.filter((v) => !exclusiveOptions.includes(v));
      }
    }

    if (isOtherNowChecked && !wasOtherChecked) {
      field.handleChange([...standardValues, ""]);
    } else if (!isOtherNowChecked && wasOtherChecked) {
      field.handleChange(standardValues);
    } else if (isOtherNowChecked) {
      field.handleChange([...standardValues, customOtherText ?? ""]);
    } else {
      field.handleChange(standardValues);
    }
  };

  const handleOtherTextChange = (text: string) => {
    const standardValues = field.state.value.filter((item: string) => optionValues.includes(item));
    field.handleChange([...standardValues, text]);
  };

  const isOtherChecked = checkboxGroupValue.includes(OTHER_VALUE);

  return (
    <div className="flex flex-col gap-2">
      <AriaCheckboxGroup
        isDisabled={isDisabled}
        isInvalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
        value={checkboxGroupValue}
        onChange={handleCheckboxGroupChange}
        className="flex flex-col gap-2"
      >
        <Label>{label}</Label>
        <div className={gridStyles({ columns })}>
          {options.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
          <Checkbox value={OTHER_VALUE}>Other</Checkbox>
        </div>
        <FieldError>{field.state.meta.errors.map((error) => error.message).join(", ")}</FieldError>
      </AriaCheckboxGroup>

      {isOtherChecked && (
        <TextField
          value={customOtherText ?? ""}
          onChange={handleOtherTextChange}
          label="Please specify"
          aria-label="Specify other"
        />
      )}

      {description && <Description>{description}</Description>}
    </div>
  );
}
