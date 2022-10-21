import { LanguagesResponse } from "ribbon-client";
import { LanguagesAction } from "./actions";
import { IReducerState } from "./IReducerState";

export function languagesReducer(
  state: IReducerState<LanguagesResponse>,
  action: LanguagesAction
) {
  switch (action.type) {
    case "FETCH_LANGUAGES_START":
      return { ...state, loading: true };
    case "FETCH_LANGUAGES_SUCCESS":
      return {
        ...state,
        error: undefined,
        data: action.data,
        loading: false,
      };
    case "FETCH_LANGUAGES_ERROR":
      return { ...state, error: action.error, loading: false, data: undefined };
    default:
      throw new Error();
  }
}
