import { useContext } from "react";
import { InsurancesParams, InsurancesResponse } from "ribbon-client";
import { StoreContext } from "../context/StoreContext";
import ribbonClient from "../config/ribbonClient";

export const useInsurances = () => {
  const { insurancesDispatch } = useContext(StoreContext);

  const fetchInsurances = async (
    params: InsurancesParams,
    callback?: Function
  ) => {
    if (typeof callback === "function") callback();
    insurancesDispatch({ type: "FETCH_INSURANCES_START" });

    try {
      const data: InsurancesResponse = await ribbonClient.Insurances.find(
        params
      );

      insurancesDispatch({
        type: "FETCH_INSURANCES_SUCCESS",
        data: data,
      });
    } catch (err) {
      insurancesDispatch({
        type: "FETCH_INSURANCES_ERROR",
        error: "Data could not be retrieved",
      });
    }
  };

  return {
    fetchInsurances,
  };
};
