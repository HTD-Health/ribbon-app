export interface IReducerState<T> {
  loading: boolean;
  data?: T;
  error?: string;
}
