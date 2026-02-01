"use client";
import React from "react";
import {
  Toolbar as RACToolbar,
  ToggleButtonGroupContext,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import type { ToolbarProps } from "react-aria-components";

const styles = tv({
  base: "flex flex-wrap gap-2",
  variants: {
    orientation: {
      horizontal: "flex-row items-center",
      vertical: "flex-col items-start",
    },
  },
});

export function Toolbar(props: ToolbarProps) {
  return (
    <ToggleButtonGroupContext.Provider value={{ orientation: props.orientation }}>
      <RACToolbar
        {...props}
        className={composeRenderProps(props.className, (className, renderProps) =>
          styles({ ...renderProps, className }),
        )}
      />
    </ToggleButtonGroupContext.Provider>
  );
}
