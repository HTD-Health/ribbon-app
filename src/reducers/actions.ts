import {
  ConditionCostEstimateResponse,
  ConditionsResponse,
  InsurancesResponse,
  LanguagesResponse,
  LocationsResponse,
  ProvidersResponse,
  SpecialtiesResponse,
  TreatmentsResponse,
} from "ribbon-client";
import {
  ConditionCostEstimateActionType,
  ConditionsActionType,
  InsurancesActionType,
  LanguagesActionType,
  LocationsActionType,
  ProvidersActionType,
  SpecialtiesActionType,
  TreatmentsActionType,
} from "./actionTypes";

export type ConditionCostEstimateAction = {
  type: ConditionCostEstimateActionType;
  data?: ConditionCostEstimateResponse;
  error?: string;
};

export type ConditionsAction = {
  type: ConditionsActionType;
  data?: ConditionsResponse;
  error?: string;
};

export type InsurancesAction = {
  type: InsurancesActionType;
  data?: InsurancesResponse;
  error?: string;
};
export type LanguagesAction = {
  type: LanguagesActionType;
  data?: LanguagesResponse;
  error?: string;
};

export type LocationsAction = {
  type: LocationsActionType;
  data?: LocationsResponse;
  error?: string;
};

export type ProvidersAction = {
  type: ProvidersActionType;
  data?: ProvidersResponse;
  error?: string;
};

export type SpecialtiesAction = {
  type: SpecialtiesActionType;
  data?: SpecialtiesResponse;
  error?: string;
};
export type TreatmentsAction = {
  type: TreatmentsActionType;
  data?: TreatmentsResponse;
  error?: string;
};
