import { NumberField as UiNumberField } from "@/components/ui/NumberField";

import { useFieldContext } from "./index";

import type { NumberFieldProps as UiNumberFieldProps } from "@/components/ui/NumberField";

export type NumberFieldProps = Omit<UiNumberFieldProps, "validate">;

export function NumberField(props: NumberFieldProps) {
  const field = useFieldContext<number>();

  return (
    <UiNumberField
      name={field.name}
      validationBehavior="aria"
      value={field.state.value}
      onChange={(v) => field.handleChange(v)}
      errorMessage={field.state.meta.errors.map((error) => error.message).join(", ")}
      onBlur={field.handleBlur}
      isInvalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
      {...props}
    />
  );
}
