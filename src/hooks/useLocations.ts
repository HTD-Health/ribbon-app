import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

// import data_ from "../../data/locations.json";
import ribbonClient from "../config/ribbonClient";
import { LocationsParams, LocationsResponse } from "ribbon-client";

export const useLocations = () => {
  const { locationsDispatch } = useContext(StoreContext);

  const fetchLocations = async (
    params: LocationsParams,
    callback?: Function
  ) => {
    if (typeof callback === "function") callback();
    locationsDispatch({ type: "FETCH_LOCATIONS_START" });

    try {
      const data: LocationsResponse = await ribbonClient.Locations.find(params);

      locationsDispatch({
        type: "FETCH_LOCATIONS_SUCCESS",
        data: data,
      });
    } catch (err) {
      locationsDispatch({
        type: "FETCH_LOCATIONS_ERROR",
        error: "Data could not be retrieved",
      });
    }
  };

  return {
    fetchLocations,
  };
};
