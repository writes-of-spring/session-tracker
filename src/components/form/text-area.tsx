import { TextArea as UiTextArea } from "@/components/ui/TextArea";

import { useFieldContext } from "./index";

import type { TextAreaProps as UiTextAreaProps } from "@/components/ui/TextArea";

export type TextAreaProps = Omit<UiTextAreaProps, "validate">;

export function TextArea(props: TextAreaProps) {
  const field = useFieldContext<string>();

  return (
    <UiTextArea
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
