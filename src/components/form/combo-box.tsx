import React from "react";

import { ComboBox as UiComboBox } from "../ui/ComboBox";

import { useFieldContext } from ".";

import type { ComboBoxProps } from "../ui/ComboBox";
import type { Key } from "react-aria";

type Props<T extends object> = Omit<ComboBoxProps<T>, "value" | "handleChange"> & {
  isLoading?: boolean;
};

export const ComboBox = <T extends object>(props: Props<T>) => {
  const field = useFieldContext<Key | null>();

  return (
    <UiComboBox<T>
      isLoading={props.isLoading}
      name={field.name}
      inputValue={(field.state.value ?? "") as string}
      onInputChange={field.handleChange}
      onBlur={field.handleBlur}
      {...props}
    />
  );
};
