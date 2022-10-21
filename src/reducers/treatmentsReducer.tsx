import { TreatmentsResponse } from "ribbon-client";
import { TreatmentsAction } from "./actions";
import { IReducerState } from "./IReducerState";

export function treatmentsReducer(
  state: IReducerState<TreatmentsResponse>,
  action: TreatmentsAction
) {
  switch (action.type) {
    case "FETCH_TREATMENTS_START":
      return { ...state, loading: true };
    case "FETCH_TREATMENTS_SUCCESS":
      return {
        ...state,
        error: undefined,
        data: action.data,
        loading: false,
      };
    case "FETCH_TREATMENTS_ERROR":
      return { ...state, error: action.error, loading: false, data: undefined };
    default:
      throw new Error();
  }
}
