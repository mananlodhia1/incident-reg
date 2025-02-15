import { createContext } from "react";

interface ResponseContextType {
  response: Record<string, unknown>;
  setResponse?: (response: Record<string, unknown>) => void;
}

export const ResponseContext = createContext<ResponseContextType>({
  response: {},
  setResponse: () => {},
});
