"use client";
import React from "react";
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  Button,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Checkbox } from "@/components/ui/Checkbox";
import { composeTailwindRenderProps, focusRing } from "@/lib/react-aria-utils";
import type { GridListItemProps, GridListProps } from "react-aria-components";

export function GridList<T extends object>({ children, ...props }: GridListProps<T>) {
  return (
    <AriaGridList
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "overflow-auto w-[200px] relative bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg font-sans empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm",
      )}
    >
      {children}
    </AriaGridList>
  );
}

const itemStyles = tv({
  extend: focusRing,
  base: "relative flex cursor-default gap-3 border-t border-transparent px-3 py-2 text-sm text-neutral-900 -outline-offset-2 select-none first:rounded-t-lg first:border-t-0 last:mb-0 last:rounded-b-lg dark:border-t-neutral-700 dark:text-neutral-200",
  variants: {
    isSelected: {
      false:
        "hover:bg-neutral-100 dark:hover:bg-neutral-700/60 pressed:bg-neutral-100 dark:pressed:bg-neutral-700/60",
      true: "z-20 border-y-blue-200 bg-blue-100 hover:bg-blue-200 dark:border-y-blue-900 dark:bg-blue-700/30 dark:hover:bg-blue-700/40 pressed:bg-blue-200 dark:pressed:bg-blue-700/40",
    },
    isDisabled: {
      true: "z-10 text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]",
    },
  },
});

export function GridListItem({ children, ...props }: GridListItemProps) {
  let textValue = typeof children === "string" ? children : undefined;
  return (
    <AriaGridListItem textValue={textValue} {...props} className={itemStyles}>
      {composeRenderProps(
        children,
        (children, { selectionMode, selectionBehavior, allowsDragging }) => (
          <>
            {/* Add elements for drag and drop and selection. */}
            {allowsDragging && <Button slot="drag">≡</Button>}
            {selectionMode !== "none" && selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
            {children}
          </>
        ),
      )}
    </AriaGridListItem>
  );
}
