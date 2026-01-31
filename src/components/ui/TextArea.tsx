"use client";
import { TextArea as AriaTextArea, TextField as AriaTextField } from "react-aria-components";
import { tv } from "tailwind-variants";

import { Description, FieldError, Label, fieldBorderStyles } from "@/components/ui/Field";
import { composeTailwindRenderProps, focusRing } from "@/lib/react-aria-utils";

import type { TextFieldProps as AriaTextFieldProps, ValidationResult } from "react-aria-components";

const textAreaStyles = tv({
  extend: focusRing,
  base: "box-border min-h-28 resize-y rounded-lg border-1 px-3 py-2 font-sans text-sm transition",
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

export interface TextAreaProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TextArea({ label, description, errorMessage, ...props }: TextAreaProps) {
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(props.className, "flex flex-col gap-1 font-sans")}
    >
      {label && <Label>{label}</Label>}
      <AriaTextArea className={textAreaStyles} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
