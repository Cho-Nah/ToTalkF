import {useCallback, useState} from "react";
import {AnyFunction} from "../types";

type FlagDispatch = AnyFunction;
type Flag = [
  boolean,
  FlagDispatch,
  FlagDispatch
];

const useFlag = (initial?: boolean): Flag => {
  const [state, setState] = useState<boolean>(initial ?? false);

  const open = useCallback(() => {
    setState(true);
  }, []);

  const close = useCallback(() => {
    setState(false);
  }, []);

  return [state, open, close];
}

export default useFlag;