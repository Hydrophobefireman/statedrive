import { State } from "./types";

interface Listener<T> {
  (oldValue: T, newValue: T): void;
}
type ListenerMap<T> = WeakMap<State<T>, Set<Listener<T>>>;
const listenerMap: ListenerMap<unknown> = new WeakMap();

export function notify<T>(state: State<T>, oldValue: T, newValue: T) {
  const listeners = (listenerMap as ListenerMap<T>).get(state);
  if (listeners) listeners.forEach((fn) => fn(oldValue, newValue));
}

export function subscribe<T>(state: State<T>, callback: Listener<T>) {
  let listeners = (listenerMap as ListenerMap<T>).get(state);
  if (listeners == null) {
    listeners = new Set();
    listenerMap.set(state, listeners);
  }
  listeners.add(callback);
}

export function unsubscribe<T>(state: State<T>, callback: Listener<T>) {
  const listeners = (listenerMap as ListenerMap<T>).get(state);
  if (listeners) listeners.delete(callback);
}
