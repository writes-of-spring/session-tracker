import {
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
  parseDate,
  parseDateTime,
} from "@internationalized/date";

import { DatePicker as UiDatePicker } from "@/components/ui/DatePicker";

import { useFieldContext } from ".";

import type { DatePickerProps } from "@/components/ui/DatePicker";
import type { DateValue } from "react-aria";

export const DatePicker = (props: DatePickerProps<DateValue>) => {
  const field = useFieldContext<string | null>();

  const value = field.state.value
    ? field.state.value.includes("T")
      ? field.state.value.includes("Z")
        ? parseAbsoluteToLocal(field.state.value)
        : parseDateTime(field.state.value)
      : parseDate(field.state.value)
    : null;

  return (
    <UiDatePicker
      placeholderValue={now(getLocalTimeZone())}
      {...props}
      validationBehavior="aria"
      isInvalid={field.state.meta.errors.length > 0}
      defaultValue={null}
      granularity="day"
      value={value}
      errorMessage={field.state.meta.errors.map((error) => error.message).join(", ")}
      onChange={(value) => {
        field.handleChange(value ? value.toDate(getLocalTimeZone()).toISOString() : null);
      }}
    />
  );
};
