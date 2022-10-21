import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import ribbonClient from "../config/ribbonClient";
import { TreatmentsParams, TreatmentsResponse } from "ribbon-client";

export const useTreatments = () => {
  const { treatmentsDispatch } = useContext(StoreContext);

  const fetchTreatments = async (
    params: TreatmentsParams,
    callback?: Function
  ) => {
    if (typeof callback === "function") callback();
    treatmentsDispatch({ type: "FETCH_TREATMENTS_START" });

    try {
      const data: TreatmentsResponse = await ribbonClient.Treatments.find(
        params
      );

      treatmentsDispatch({
        type: "FETCH_TREATMENTS_SUCCESS",
        data: data,
      });
    } catch (err) {
      treatmentsDispatch({
        type: "FETCH_TREATMENTS_ERROR",
        error: "Data could not be retrieved",
      });
    }
  };

  return {
    fetchTreatments,
  };
};
