import React, { createContext, FunctionComponent, useReducer } from "react";
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
  ConditionCostEstimateAction,
  ConditionsAction,
  initialReducerState,
  InsurancesAction,
  insurancesReducer,
  IReducerState,
  LanguagesAction,
  languagesReducer,
  LocationsAction,
  ProvidersAction,
  providersReducer,
  SpecialtiesAction,
  specialtiesReducer,
  TreatmentsAction,
} from "../reducers";
import { conditionCostEstimateReducer } from "../reducers/conditionCostEstimateReducer";
import { conditionsReducer } from "../reducers/conditionsReducer";
import { treatmentsReducer } from "../reducers/treatmentsReducer";
import { locationsReducer } from "../reducers/locationsReducer";

export type storeType = {
  conditionCostEstimateState: IReducerState<ConditionCostEstimateResponse>;
  conditionsState: IReducerState<ConditionsResponse>;
  insurancesState: IReducerState<InsurancesResponse>;
  locationsState: IReducerState<LocationsResponse>;
  providersState: IReducerState<ProvidersResponse>;
  specialtiesState: IReducerState<SpecialtiesResponse>;
  languagesState: IReducerState<LanguagesResponse>;
  treatmentsState: IReducerState<TreatmentsResponse>;
  conditionCostEstimateDispatch: (action: ConditionCostEstimateAction) => void;
  conditionsDispatch: (action: ConditionsAction) => void;
  insurancesDispatch: (action: InsurancesAction) => void;
  languagesDispatch: (action: LanguagesAction) => void;
  locationsDispatch: (action: LocationsAction) => void;
  providersDispatch: (action: ProvidersAction) => void;
  specialtiesDispatch: (action: SpecialtiesAction) => void;
  treatmentsDispatch: (action: TreatmentsAction) => void;
};

const defaultStore: storeType = {
  conditionCostEstimateState: initialReducerState,
  conditionsState: initialReducerState,
  locationsState: initialReducerState,
  insurancesState: initialReducerState,
  providersState: initialReducerState,
  specialtiesState: initialReducerState,
  languagesState: initialReducerState,
  treatmentsState: initialReducerState,
  conditionCostEstimateDispatch: () => {},
  conditionsDispatch: () => {},
  insurancesDispatch: () => {},
  languagesDispatch: () => {},
  locationsDispatch: () => {},
  providersDispatch: () => {},
  specialtiesDispatch: () => {},
  treatmentsDispatch: () => {},
};

export const StoreContext = createContext<storeType>(defaultStore);

interface StoreProps {
  children?: React.ReactNode;
}

export const Store: FunctionComponent<StoreProps> = ({ children }) => {
  const [conditionCostEstimateState, conditionCostEstimateDispatch] =
    useReducer(conditionCostEstimateReducer, initialReducerState);

  const [conditionsState, conditionsDispatch] = useReducer(
    conditionsReducer,
    initialReducerState
  );

  const [insurancesState, insurancesDispatch] = useReducer(
    insurancesReducer,
    initialReducerState
  );

  const [languagesState, languagesDispatch] = useReducer(
    languagesReducer,
    initialReducerState
  );

  const [locationsState, locationsDispatch] = useReducer(
    locationsReducer,
    initialReducerState
  );

  const [providersState, providersDispatch] = useReducer(
    providersReducer,
    initialReducerState
  );

  const [specialtiesState, specialtiesDispatch] = useReducer(
    specialtiesReducer,
    initialReducerState
  );
  const [treatmentsState, treatmentsDispatch] = useReducer(
    treatmentsReducer,
    initialReducerState
  );

  const store: storeType = {
    conditionCostEstimateState,
    conditionsState,
    insurancesState,
    languagesState,
    locationsState,
    providersState,
    specialtiesState,
    treatmentsState,
    conditionCostEstimateDispatch,
    conditionsDispatch,
    insurancesDispatch,
    languagesDispatch,
    locationsDispatch,
    providersDispatch,
    specialtiesDispatch,
    treatmentsDispatch,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
