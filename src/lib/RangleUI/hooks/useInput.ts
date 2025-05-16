import React, {useCallback, useState} from "react";

const useInput = (initialValue?: string) => {
  const [value, setValue] = useState<string>(initialValue || "");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const clear = () => setValue("");

  return {
    value,
    clear,
    setValue,
    onChange
  }
}

export default useInput;