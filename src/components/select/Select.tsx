import { Props, Select as ChakraReactSelect } from "chakra-react-select";
import { ClearButton } from "../button/ClearButton";

export type Option<T = string> = { value: T; label: string };

type SelectProps<T = Option> = Props<T, true>;

export const Select = <T,>(props: SelectProps<T>) => {
  return (
    <ChakraReactSelect
      {...props}
      isMulti
      chakraStyles={chakraStyles as SelectProps<T>["chakraStyles"]}
      components={components}
      size="md"
      openMenuOnFocus
    />
  );
};

const components = {
  ClearIndicator: ({ innerProps }: Record<string, any>) => (
    <ClearButton {...innerProps} aria-label="Clear selection" />
  ),
} as const;

const chakraStyles: SelectProps["chakraStyles"] = {
  container: (base) => ({
    ...base,
    borderRadius: "full",
    width: "full",
    _notLast: {
      mb: 4,
    },
  }),
  control: (base) => ({
    ...base,
    borderRadius: "full",
  }),
  menuList: (base) => ({
    ...base,
    py: 0,
    borderRadius: "xl",
  }),
};
