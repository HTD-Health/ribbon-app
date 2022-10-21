import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import ribbonClient from "../config/ribbonClient";
import {
  ConditionCostEstimateParams,
  ConditionCostEstimateResponse,
} from "ribbon-client";

export const useConditionCostEstimate = () => {
  const { conditionCostEstimateDispatch } = useContext(StoreContext);

  const fetchConditionCostEstimate = async (
    params: ConditionCostEstimateParams,
    callback?: Function
  ) => {
    if (typeof callback === "function") callback();
    conditionCostEstimateDispatch({
      type: "FETCH_CONDITION_COST_ESTIMATE_START",
    });

    try {
      const data: ConditionCostEstimateResponse =
        await ribbonClient.ConditionCostEstimate.find(params);

      conditionCostEstimateDispatch({
        type: "FETCH_CONDITION_COST_ESTIMATE_SUCCESS",
        data: data,
      });
    } catch (err) {
      conditionCostEstimateDispatch({
        type: "FETCH_CONDITION_COST_ESTIMATE_ERROR",
        error: "Data could not be retrieved",
      });
    }
  };

  return {
    fetchConditionCostEstimate,
  };
};
