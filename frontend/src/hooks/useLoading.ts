import { useState } from "react";

export function useLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return { isLoading, setIsLoading };
}
