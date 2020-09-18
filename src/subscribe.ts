import { FakeWeakMap, FakeSet } from "@hydrophobefireman/j-utils";
import { State } from "./types";

interface Listener<T> {
  (oldValue: T, newValue: T): void;
}
type ListenerMap<T> = FakeWeakMap<State<T>, FakeSet<Listener<T>>>;
const listenerMap: ListenerMap<unknown> = new FakeWeakMap();

export function notify<T>(state: State<T>, oldValue: T, newValue: T) {
  const listeners = (listenerMap as ListenerMap<T>).get(state);
  if (listeners) listeners.forEach((fn) => fn(oldValue, newValue));
}

export function subscribe<T>(state: State<T>, callback: Listener<T>) {
  let listeners = (listenerMap as ListenerMap<T>).get(state);
  if (listeners == null) {
    listeners = new FakeSet();
    listenerMap.set(state, listeners);
  }
  listeners.add(callback);
}

export function unsubscribe<T>(state: State<T>, callback: Listener<T>) {
  const listeners = (listenerMap as ListenerMap<T>).get(state);
  if (listeners) listeners.delete(callback);
}
