import { InsurancesResponse } from "ribbon-client";
import { InsurancesAction } from "./actions";
import { IReducerState } from "./IReducerState";

export function insurancesReducer(
  state: IReducerState<InsurancesResponse>,
  action: InsurancesAction
) {
  switch (action.type) {
    case "FETCH_INSURANCES_START":
      return { ...state, loading: true };
    case "FETCH_INSURANCES_SUCCESS":
      return {
        ...state,
        error: undefined,
        data: action.data,
        loading: false,
      };
    case "FETCH_INSURANCES_ERROR":
      return { ...state, error: action.error, loading: false, data: undefined };
    default:
      throw new Error();
  }
}
