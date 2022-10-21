import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import ribbonClient from "../config/ribbonClient";
import { SpecialtiesParams, SpecialtiesResponse } from "ribbon-client";

export const useSpecialties = () => {
  const { specialtiesDispatch } = useContext(StoreContext);

  const fetchSpecialties = async (
    params: SpecialtiesParams,
    callback?: Function
  ) => {
    if (typeof callback === "function") callback();
    specialtiesDispatch({ type: "FETCH_SPECIALTIES_START" });

    try {
      const data: SpecialtiesResponse = await ribbonClient.Specialties.find(
        params
      );

      specialtiesDispatch({
        type: "FETCH_SPECIALTIES_SUCCESS",
        data: data,
      });
    } catch (err) {
      specialtiesDispatch({
        type: "FETCH_SPECIALTIES_ERROR",
        error: "Data could not be retrieved",
      });
    }
  };

  return {
    fetchSpecialties,
  };
};
