import { ChevronDown, X } from "lucide-react";
import React from "react";
import {
  Select as AriaSelect,
  Button,
  ListBox,
  SelectStateContext,
  SelectValue,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "@/lib/react-aria-utils";
import { Button as StyledButton } from "./Button";
import { Description, FieldError, Label } from "./Field";
import { DropdownItem, DropdownSection } from "./ListBox";
import { Popover } from "./Popover";
import type { DropdownSectionProps } from "./ListBox";
import type {
  SelectProps as AriaSelectProps,
  ListBoxItemProps,
  ValidationResult,
} from "react-aria-components";

const styles = tv({
  extend: focusRing,
  base: "flex w-full min-w-[150px] cursor-default items-center gap-4 rounded-lg border border-black/10 bg-zinc-50 py-2 pr-2 pl-3 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition group-invalid:border-red-600 dark:border-white/10 dark:bg-zinc-700 dark:shadow-none forced-colors:group-invalid:border-[Mark]",
  variants: {
    isDisabled: {
      false:
        "text-zinc-800 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-600 pressed:bg-zinc-200 dark:pressed:bg-zinc-500",
      true: "text-zinc-200 dark:border-white/5 dark:bg-zinc-800 dark:text-zinc-600 forced-colors:border-[GrayText] forced-colors:text-[GrayText]",
    },
    isClearable: {
      true: "pr-14",
      false: "pr-8",
    },
  },
});

export interface SelectProps<
  T extends object,
  TMode extends "single" | "multiple" = "single",
> extends Omit<AriaSelectProps<T, TMode>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  isClearable?: boolean;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T extends object, TMode extends "single" | "multiple" = "single">({
  label,
  description,
  errorMessage,
  children,
  items,
  isClearable = false,
  ...props
}: SelectProps<T, TMode>) {
  return (
    <AriaSelect
      validationBehavior="aria"
      className={composeTailwindRenderProps(props.className, "group flex flex-col gap-1")}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Button
          className={composeRenderProps("", (className, buttonProps) =>
            styles({
              ...buttonProps,
              isClearable,
              className,
            }),
          )}
        >
          <SelectValue
            className={
              "flex-1 text-sm *:inline *:whitespace-nowrap group-invalid:text-red-600 placeholder-shown:italic"
            }
          />
        </Button>

        {isClearable && <SelectClearButton />}

        <ChevronDown
          aria-hidden
          className={
            "pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-600 group-invalid:text-red-600 group-disabled:text-zinc-200 dark:text-zinc-400 dark:group-invalid:text-red-500 dark:group-disabled:text-zinc-600 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"
          }
        />
      </div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-(--trigger-width)">
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto p-1 outline-hidden [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function SelectSection<T extends object>(props: DropdownSectionProps<T>) {
  return <DropdownSection {...props} />;
}

function SelectClearButton() {
  const state = React.useContext(SelectStateContext);

  // Check if there's a selection
  // For single mode: value is Key | null
  // For multiple mode: value is Key[] (array)
  const hasValue = Array.isArray(state?.value)
    ? state.value.length > 0
    : state?.value != null && state.value !== "";

  // Try to respect disabled state when available on context

  const isDisabled = (state as any)?.isDisabled ?? false;

  if (!hasValue || isDisabled) {
    return null;
  }

  return (
    <StyledButton
      aria-label="Clear selection"
      variant="quiet"
      // Don't inherit behavior from Select.
      slot={null}
      onPress={() => {
        if (!state) return;
        // Clear based on value type
        // If value is array (multiple mode), set to empty array
        // If value is Key | null (single mode), set to null
        if (Array.isArray(state.value)) {
          state.setValue([]);
        } else {
          state.setValue(null);
        }
      }}
      className={
        "absolute top-1/2 right-9 z-10 -translate-y-1/2 text-zinc-600 group-disabled:text-zinc-200 dark:text-zinc-400 dark:group-disabled:text-zinc-600 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"
      }
    >
      <X className="size-3" />
    </StyledButton>
  );
}
