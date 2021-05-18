import { SelectorOptions, SetSharedState, State, StateUpdater } from "./types";
import type {
  useCallback as UseCallbackType,
  useEffect as UseEffectType,
  useMemo as UseMemoType,
  useState as UseStateType,
} from "@hydrophobefireman/ui-lib";
import { get, set } from "./state";
import { subscribe, unsubscribe } from "./subscribe";

namespace Hooks {
  export type useEffect = typeof UseEffectType;
  export type useState = typeof UseStateType;
  export type useCallback = typeof UseCallbackType;
  export type useMemo = typeof UseMemoType;
}

export function createUseSharedState(
  useEffect: Hooks.useEffect,
  useState: Hooks.useState
) {
  return function useSharedState<T>(state: State<T>): [T, SetSharedState<T>] {
    const [value, setValue] = useState(() => get(state));

    useEffect(() => {
      const listener = (_: T, newVal: T) => setValue(newVal);
      subscribe(state, listener);
      return () => unsubscribe(state, listener);
    }, [state]);

    return [value, (nextValue: StateUpdater<T>) => set(state, nextValue)];
  };
}

export function createUseSelector(
  useEffect: Hooks.useEffect,
  useState: Hooks.useState,
  useMemo: Hooks.useMemo,
  useCallback: Hooks.useCallback
) {
  return function useSelector<R>(func: (options: SelectorOptions<R>) => R): R {
    const hasSubscribed = useMemo(() => new Set<State<unknown>>(), []);
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
    useEffect(
      () => () => hasSubscribed.forEach((x) => unsubscribe(x, fn)),
      [hasSubscribed, fn]
    );
    return func({ get: _get });
  };
}

export function createUseSharedStateValue(
  useSharedState: ReturnType<typeof createUseSharedState>
) {
  return function useSharedStateValue<T>(s: State<T>): T {
    return useSharedState(s)[0];
  };
}
export function createUseSetSharedState(
  useSharedState: ReturnType<typeof createUseSharedState>
) {
  return function useSetSharedState<T>(s: State<T>): SetSharedState<T> {
    return useSharedState(s)[1];
  };
}
