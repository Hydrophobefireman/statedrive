import { useState, useEffect, useCallback } from "@hydrophobefireman/ui-lib";
import { State, StateUpdater } from "./types";
import { subscribe, unsubscribe } from "./subscribe";
import { get, set } from "./state";

export function useSharedState<T>(
  state: State<T>
): [T, (val: StateUpdater<T>) => void] {
  const [value, setValue] = useState(() => get(state));

  useEffect(() => {
    const listener = (_: T, newVal: T) => setValue(newVal);
    subscribe(state, listener);
    return () => unsubscribe(state, listener);
  }, [state]);

  return [
    value,
    useCallback((nextValue: StateUpdater<T>) => set(state, nextValue)),
  ];
}

export function useSelector<T, U extends Array<State<T>>, R>(
  func: () => R,
  args: U
): R {
  if (!args || !args.length) throw new Error("Provide dependency array!");
  const [_, setState] = useState(null);
  useEffect(() => {
    const sub = () => setState({});
    args.forEach((x) => subscribe(x, sub));
    return () => args.forEach((x) => unsubscribe(x, sub));
  }, args);
  return func();
}
