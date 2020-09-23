export interface StateOptions<T> {
  name?: string;
  initialValue?: T;
}
export interface State<T> {
  name: string | void;
}
export interface FunctionUpdater<T> {
  (previous?: T): T;
}
export interface SetSharedState<T> {
  (val: StateUpdater<T>): void;
}
export interface SelectorOptions<T> {
  get(s: State<T>): T;
}

export type StateUpdater<T> = T | FunctionUpdater<T>;

export {};
