import type {State} from "./types";

interface Listener<T> {
  (oldValue: T, newValue: T): void;
}

const listenerMap = new WeakMap<State<any>, Set<Listener<any>>>();

export function notify<T>(state: State<T>, oldValue: T, newValue: T) {
  const listeners = listenerMap.get(state) as Set<Listener<T>> | undefined;
  if (listeners) listeners.forEach((fn) => fn(oldValue, newValue));
}

export function subscribe<T>(state: State<T>, callback: Listener<T>) {
  let listeners = listenerMap.get(state) as Set<Listener<T>> | undefined;
  if (listeners == null) {
    listeners = new Set();
    listenerMap.set(state, listeners);
  }
  listeners.add(callback);
}

export function unsubscribe<T>(state: State<T>, callback: Listener<T>) {
  const listeners = listenerMap.get(state) as Set<Listener<T>> | undefined;
  if (listeners) listeners.delete(callback);
}
