import {useState, useEffect} from "react";

const useDebounce = <T>(dep: T, delay=350) => {
  const [value, setValue] = useState(dep);

  useEffect(() => {
    let interval = setInterval(() => setValue(dep), delay);

    return () => {
      clearInterval(interval);
    }
  }, [dep, delay]);

  return value;
}

export default useDebounce;