import { useContext } from "react";
import { LanguagesParams, LanguagesResponse } from "ribbon-client";
import ribbonClient from "../config/ribbonClient";
import { StoreContext } from "../context/StoreContext";

export const useLanguages = () => {
  const { languagesDispatch } = useContext(StoreContext);

  const fetchLanguages = async (
    params: LanguagesParams,
    callback?: Function
  ) => {
    if (typeof callback === "function") callback();
    languagesDispatch({ type: "FETCH_LANGUAGES_START" });

    try {
      const data: LanguagesResponse = await ribbonClient.Languages.find(params);

      languagesDispatch({
        type: "FETCH_LANGUAGES_SUCCESS",
        data: data,
      });
    } catch (err) {
      languagesDispatch({
        type: "FETCH_LANGUAGES_ERROR",
        error: "Data could not be retrieved",
      });
    }
  };
  return {
    fetchLanguages,
  };
};
