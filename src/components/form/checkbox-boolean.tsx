import React from "react";
import { Checkbox as UiCheckbox } from "../ui/Checkbox";
import { useFieldContext } from ".";
import type { CheckboxProps } from "react-aria-components";

interface Props extends Omit<CheckboxProps, "isSelected" | "onChange" | "children"> {
  children?: React.ReactNode;
}

const CheckboxBoolean = ({ children, ...rest }: Props) => {
  const field = useFieldContext<boolean | undefined>();

  return (
    <UiCheckbox
      isSelected={field.state.value}
      isIndeterminate={field.state.value == null}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      isInvalid={!field.state.meta.isValid}
      validationBehavior="aria"
      {...rest}
    >
      {children}
    </UiCheckbox>
  );
};

export default CheckboxBoolean;
