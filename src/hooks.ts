import {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "@hydrophobefireman/ui-lib";
import { State, StateUpdater, SelectorOptions, SetSharedState } from "./types";
import { subscribe, unsubscribe } from "./subscribe";
import { get, set } from "./state";
import { FakeSet } from "@hydrophobefireman/j-utils";

export function useSharedState<T>(state: State<T>): [T, SetSharedState<T>] {
  const [value, setValue] = useState(() => get(state));

  useEffect(() => {
    const listener = (_: T, newVal: T) => setValue(newVal);
    subscribe(state, listener);
    return () => unsubscribe(state, listener);
  }, [state]);

  return [
    value,
    (nextValue: StateUpdater<T>) => set(state, nextValue),
  ];
}

export function useSelector<R>(func: (options: SelectorOptions<R>) => R): R {
  const hasSubscribed = useMemo(() => new FakeSet<State<unknown>>(), []);
  const [, setState] = useState(null);
  const fn = useCallback(() => setState({}), []);
  const _get = useCallback(
    <S>(s: State<S>): S => {
      if (!hasSubscribed.has(s)) {
        hasSubscribed.add(s);
        subscribe(s, fn);
      }
      return get(s);
    },
    [hasSubscribed]
  );
  useEffect(() => () => hasSubscribed.forEach((x) => unsubscribe(x, fn)), [
    hasSubscribed,
    fn,
  ]);
  return func({ get: _get });
}

export function useSharedStateValue<T>(s: State<T>): T {
  return useSharedState(s)[0];
}

export function useSetSharedState<T>(s: State<T>): SetSharedState<T> {
  return useSharedState(s)[1];
}
