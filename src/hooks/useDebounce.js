import { useEffect, useState } from "react";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Uma função de limpeza para cancelar o timeout se o componente for desmontado ou se o valor mudar
    return () => clearTimeout(timeout)
  }, [value, delay]);
  
  return debouncedValue;
}