// Thanks to react-use
// https://github.com/streamich/react-use/blob/master/src/useClickAway.ts

import {off, on} from "./util";
import {AnyCallback} from "../types";
import {RefObject, useEffect, useRef} from "react";

const defaultEvents = ["mousedown", "touchstart"];

const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>, 
  onClickAway: AnyCallback<E>, 
  events: string[] = defaultEvents
) => {
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event: any) => {
      const { current: el } = ref;
      el && !el.contains(event.target) && savedCallback.current(event);
    }

    for (const eventName of events) {
      on(document, eventName, handler);
    }

    return () => {
      for (const eventName of events) {
        off(document, eventName, handler);
      }
    }
  }, [events, ref]);
};

export default useClickAway;
