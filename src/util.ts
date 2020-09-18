import { StateUpdater, FunctionUpdater } from "./types";

export function consumeUpdater<T>(u: StateUpdater<T>, oldValue: T) {
  if (typeof u === "function") return (u as FunctionUpdater<T>)(oldValue);
  return u;
}
