import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import CheckboxBoolean from "./checkbox-boolean";
import { ComboBox } from "./combo-box";
import { DatePicker } from "./date-picker";
import { MultiSelect } from "./multi-select";
import { MultiSelectOther } from "./multi-select-other";
import { NumberField } from "./number-field";
import { RadioGroup } from "./radio-group";
import { Select } from "./select";
import { SelectOther } from "./select-other";
import { SubscribeButton } from "./subscribe-button";
import { TextArea } from "./text-area";
import { TextField as TF } from "./text-field";

export {
  CheckboxBoolean,
  ComboBox,
  DatePicker,
  MultiSelect,
  MultiSelectOther,
  NumberField,
  RadioGroup,
  Select,
  SelectOther,
  SubscribeButton,
  TextArea,
  TF as TextField,
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField: TF,
    TextArea,
    Select,
    CheckboxBoolean,
    DatePicker,
    NumberField,
    ComboBox,
    RadioGroup,
    MultiSelect,
    MultiSelectOther,
    SelectOther,
  },
  formComponents: {
    SubscribeButton,
  },
});
