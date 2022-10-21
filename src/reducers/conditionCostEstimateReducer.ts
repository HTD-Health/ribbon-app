import { ConditionCostEstimateResponse } from "ribbon-client";
import { ConditionCostEstimateAction } from "./actions";
import { IReducerState } from "./IReducerState";

export function conditionCostEstimateReducer(
  state: IReducerState<ConditionCostEstimateResponse>,
  action: ConditionCostEstimateAction
) {
  switch (action.type) {
    case "FETCH_CONDITION_COST_ESTIMATE_START":
      return { ...state, loading: true };
    case "FETCH_CONDITION_COST_ESTIMATE_SUCCESS":
      return {
        ...state,
        error: undefined,
        data: action.data,
        loading: false,
      };
    case "FETCH_CONDITION_COST_ESTIMATE_ERROR":
      return { ...state, error: action.error, loading: false, data: undefined };
    default:
      throw new Error();
  }
}
