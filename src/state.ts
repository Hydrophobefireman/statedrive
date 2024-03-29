import { State, StateOptions, StateUpdater } from "./types";

import { consumeUpdater } from "./util";
import { notify } from "./subscribe";

const valueMap = new WeakMap<State<unknown>, unknown>();

export function createState<T>(options: StateOptions<T>): State<T> {
  const state = _state(options || {});
  valueMap.set(state, options.initialValue);
  return state;
}

function _state<T>(options: StateOptions<T> | State<T>) {
  return { name: options.name };
}

export function get<T>(state: State<T>): T {
  return valueMap.get(state) as T;
}

export function set<T>(state: State<T>, newValue: StateUpdater<T>) {
  const oldValue = get(state);
  const next = consumeUpdater(newValue, oldValue);
  valueMap.set(state, next);
  notify(state, oldValue, next);
}
