import { TextField as UiTextField } from "@/components/ui/TextField";
import { useFieldContext } from "./index";
import type { TextFieldProps as UiTextFieldProps } from "@/components/ui/TextField";

export type TextFieldProps = Omit<UiTextFieldProps, "validate">;

export function TextField(props: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <UiTextField
      name={field.name}
      validationBehavior="aria"
      value={field.state.value || ""}
      onChange={(v) => field.handleChange(v)}
      errorMessage={field.state.meta.errors.map((error) => error.message).join(", ")}
      onBlur={field.handleBlur}
      isInvalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
      {...props}
    />
  );
}
