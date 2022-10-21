import { SpecialtiesResponse } from "ribbon-client";
import { IReducerState } from "./IReducerState";
import { SpecialtiesAction } from "./actions";

export function specialtiesReducer(
  state: IReducerState<SpecialtiesResponse>,
  action: SpecialtiesAction
) {
  switch (action.type) {
    case "FETCH_SPECIALTIES_START":
      return { ...state, loading: true };
    case "FETCH_SPECIALTIES_SUCCESS":
      return {
        ...state,
        error: undefined,
        data: action.data,
        loading: false,
      };
    case "FETCH_SPECIALTIES_ERROR":
      return { ...state, error: action.error, loading: false, data: undefined };
    default:
      throw new Error();
  }
}
