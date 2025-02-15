import { useState } from "react";

export function useErrors() {
  const [error, setError] = useState<{ message?: string } | null>(null);

  return { error, setError };
}
