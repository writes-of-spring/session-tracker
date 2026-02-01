import { Radio, RadioGroup as UiRadioGroup } from "@/components/ui/RadioGroup";
import { useFieldContext } from ".";
import type { RadioGroupProps as UiRadioGroupProps } from "@/components/ui/RadioGroup";

export interface RadioGroupProps extends Omit<
  UiRadioGroupProps,
  "value" | "onChange" | "children"
> {
  options: readonly { value: string; label: string }[];
}

export function RadioGroup({ options, ...props }: RadioGroupProps) {
  const field = useFieldContext<string | null>();

  return (
    <UiRadioGroup
      {...props}
      value={field.state.value ?? ""}
      onChange={(value) => {
        field.handleChange(value === "" ? null : value);
      }}
      errorMessage={field.state.meta.errors.map((e) => e.message).join(", ")}
      isInvalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
    >
      {options.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </UiRadioGroup>
  );
}
