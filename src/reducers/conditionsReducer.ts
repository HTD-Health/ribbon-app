import { ConditionsResponse } from "ribbon-client";
import { ConditionsAction } from "./actions";
import { IReducerState } from "./IReducerState";

export function conditionsReducer(
  state: IReducerState<ConditionsResponse>,
  action: ConditionsAction
) {
  switch (action.type) {
    case "FETCH_CONDITIONS_START":
      return { ...state, loading: true };
    case "FETCH_CONDITIONS_SUCCESS":
      return {
        ...state,
        error: undefined,
        data: action.data,
        loading: false,
      };
    case "FETCH_CONDITIONS_ERROR":
      return { ...state, error: action.error, loading: false, data: undefined };
    default:
      throw new Error();
  }
}
