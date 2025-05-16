import {useState, useEffect, useCallback} from "react";
import Environment, {IEnvironment} from "../utils/environment";

const useEnv = () => {
  const [env, setEnv] = useState<IEnvironment>(Environment.currentEnv());
    
  const handleResize = useCallback(() => {
    setEnv(Environment.currentEnv());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
		
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);

  return env;
}

export default useEnv;