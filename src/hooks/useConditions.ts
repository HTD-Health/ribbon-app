import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import ribbonClient from "../config/ribbonClient";
import { ConditionsParams, ConditionsResponse } from "ribbon-client";

export const useConditions = () => {
  const { conditionsDispatch } = useContext(StoreContext);

  const fetchConditions = async (
    params: ConditionsParams,
    callback?: Function
  ) => {
    if (typeof callback === "function") callback();
    conditionsDispatch({ type: "FETCH_CONDITIONS_START" });

    try {
      const data: ConditionsResponse = await ribbonClient.Conditions.find(
        params
      );

      conditionsDispatch({
        type: "FETCH_CONDITIONS_SUCCESS",
        data: data,
      });
    } catch (err) {
      conditionsDispatch({
        type: "FETCH_CONDITIONS_ERROR",
        error: "Data could not be retrieved",
      });
    }
  };

  return {
    fetchConditions,
  };
};
