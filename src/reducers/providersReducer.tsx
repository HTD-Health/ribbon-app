import { ProvidersResponse } from "ribbon-client";
import { ProvidersAction } from "./actions";
import { IReducerState } from "./IReducerState";

export function providersReducer(
  state: IReducerState<ProvidersResponse>,
  action: ProvidersAction
) {
  switch (action.type) {
    case "FETCH_PROVIDERS_START":
      return { ...state, loading: true };
    case "FETCH_PROVIDERS_SUCCESS":
      return {
        ...state,
        error: undefined,
        data: action.data,
        loading: false,
      };
    case "FETCH_PROVIDERS_ERROR":
      return { ...state, error: action.error, loading: false, data: undefined };
    default:
      throw new Error();
  }
}
