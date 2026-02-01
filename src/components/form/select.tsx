import { Select as UiSelect } from "../ui/Select";
import { useFieldContext } from ".";
import type { SelectProps as UiSelectProps } from "../ui/Select";
import type { Key } from "react-aria-components";

type SelectionMode = "single" | "multiple";

type ValueType<TMode extends SelectionMode> = TMode extends "single" ? Key | null : Key[];

export type SelectProps<T extends object, TMode extends "single" | "multiple" = "single"> = Omit<
  UiSelectProps<T, TMode>,
  "validate" | "form"
>;

export function Select<T extends object, TMode extends "single" | "multiple" = "single">(
  props: Omit<SelectProps<T, TMode>, "value" | "onChange">,
) {
  const field = useFieldContext<ValueType<TMode>>();

  return (
    <UiSelect
      {...props}
      value={field.state.value}
      onChange={(value) => {
        field.handleChange(value);
      }}
      errorMessage={field.state.meta.errors.map((e) => e.message).join(", ")}
      isInvalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
      onBlur={field.handleBlur}
    />
  );
}
