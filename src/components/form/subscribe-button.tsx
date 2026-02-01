import { Button } from "../ui/Button";
import { useFormContext } from ".";
import type { ButtonProps } from "../ui/Button";

type Props = ButtonProps & {
  label?: string;
};

export function SubscribeButton(props: Props) {
  let { children } = props;
  const form = useFormContext();

  if (typeof props.label === "string") {
    children = props.label;
  }

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" isDisabled={isSubmitting} {...props}>
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}
