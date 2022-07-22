import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "~/store";
import { theme } from "./theme";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
};
