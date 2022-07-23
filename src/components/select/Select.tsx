import { Props, Select as ChakraReactSelect } from "chakra-react-select";
import { ClearButton } from "../button/ClearButton";

type SelectProps<Option = unknown> = Props<Option, true>;

export const Select = <Option,>(props: SelectProps<Option>) => {
  return (
    <ChakraReactSelect
      {...props}
      isMulti
      chakraStyles={chakraStyles as SelectProps<Option>["chakraStyles"]}
      components={components}
      size="md"
      openMenuOnFocus
    />
  );
};

const components = {
  ClearIndicator: ({ innerProps }) => (
    <ClearButton {...innerProps} aria-label="Clear selection" />
  ),
} as SelectProps["components"];

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
