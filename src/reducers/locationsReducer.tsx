import { LocationsResponse } from "ribbon-client";
import { LocationsAction } from "./actions";
import { IReducerState } from "./IReducerState";

export function locationsReducer(
  state: IReducerState<LocationsResponse>,
  action: LocationsAction
) {
  switch (action.type) {
    case "FETCH_LOCATIONS_START":
      return { ...state, loading: true };
    case "FETCH_LOCATIONS_SUCCESS":
      return {
        ...state,
        error: undefined,
        data: action.data,
        loading: false,
      };
    case "FETCH_LOCATIONS_ERROR":
      return { ...state, error: action.error, loading: false, data: undefined };
    default:
      throw new Error();
  }
}
