import { useContext } from "react";
import { ProvidersParams, ProvidersResponse } from "ribbon-client";
import { StoreContext } from "../context/StoreContext";
import ribbonClient from "../config/ribbonClient";

export const useProviders = () => {
  const { providersDispatch } = useContext(StoreContext);

  const fetchProviders = async (
    params: ProvidersParams,
    callback?: Function
  ) => {
    if (typeof callback === "function") callback();
    providersDispatch({ type: "FETCH_PROVIDERS_START" });

    try {
      const data: ProvidersResponse = await ribbonClient.Providers.find(params);

      providersDispatch({
        type: "FETCH_PROVIDERS_SUCCESS",
        data: data,
      });
    } catch (err) {
      providersDispatch({
        type: "FETCH_PROVIDERS_ERROR",
        error: "Data could not be retrieved",
      });
    }
  };

  return {
    fetchProviders,
  };
};
