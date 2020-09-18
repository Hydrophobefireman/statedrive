export interface StateOptions<T> {
  name?: string;
  initialValue?: T;
}
export interface State<T> {
  name: string | void;
}
export type FunctionUpdater<T> = (previous?: T) => T;
export type StateUpdater<T> = T | FunctionUpdater<T>;
