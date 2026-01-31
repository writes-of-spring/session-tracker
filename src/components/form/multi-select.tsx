import { CheckboxGroup as AriaCheckboxGroup } from "react-aria-components";
import { tv } from "tailwind-variants";

import { Checkbox } from "../ui/Checkbox";
import { Description, FieldError, Label } from "../ui/Field";

import { useFieldContext } from "./index";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
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

export function MultiSelect({
  label,
  options,
  description,
  columns = 1,
  isDisabled = false,
  exclusiveOptions = [],
}: MultiSelectProps) {
  const field = useFieldContext<string[]>();

  const handleChange = (newValues: string[]) => {
    if (exclusiveOptions.length === 0) {
      field.handleChange(newValues);
      return;
    }

    const prevValue = field.state.value;
    const prevExclusives = prevValue.filter((v) => exclusiveOptions.includes(v));
    const newExclusives = newValues.filter((v) => exclusiveOptions.includes(v));

    const addedExclusive = newExclusives.find((v) => !prevExclusives.includes(v));

    if (addedExclusive) {
      field.handleChange([addedExclusive]);
    } else if (prevExclusives.length > 0 && newValues.length > prevExclusives.length) {
      const filtered = newValues.filter((v) => !exclusiveOptions.includes(v));
      field.handleChange(filtered);
    } else {
      field.handleChange(newValues);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <AriaCheckboxGroup
        isInvalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
        isDisabled={isDisabled}
        value={field.state.value}
        onChange={handleChange}
        className="flex flex-col gap-2"
      >
        <Label>{label}</Label>
        <div className={gridStyles({ columns })}>
          {options.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </div>
        <FieldError>{field.state.meta.errors.map((error) => error.message).join(", ")}</FieldError>
      </AriaCheckboxGroup>

      {description && <Description>{description}</Description>}
    </div>
  );
}
