import { Database } from "@/app/database.types";
import React, { createContext, ReactNode, useContext, useReducer } from "react";

// Define the shape of your form state
export interface FormState {
  matchType: Database['public']['Enums']['matchscouttype'];

  nameText: string;
  matchNumber: string;
  teamNumber: string;
  selectedStation: Database['public']['Enums']['driverstation'];

  selectedStartPosition: Database['public']['Enums']['autostartpositionsrebuilt'];
  autoClimb: boolean;
  autoClimbLocation: Database['public']['Enums']['climbpositionsrebuilt'];
  autoStrengthOfShooting: number;
  autoIssues: string;
  fuelTakenFromNeutralZone: number;
  autoPathDetails: string;
  autoDepot: boolean;
  autoOutpost: boolean;

  teleShotsMade: number;
  teleFuelPassed: number;
  teleFuelDozed: number;
  telePoints: number;
  //telePassLocations: string;

  playedDefense: boolean;
  defenseStrength: number;
  defendBumpTrench: boolean;
  defendNeutral: boolean;
  defendAllianceZone: boolean;

  climbType: Database['public']['Enums']['endgametyperebuilt'];
  teleClimbLocation: Database['public']['Enums']['climbpositionsrebuilt'];
  teleClimbTime: string;
  endgamePoints: number;

  shotLocations: Database['public']['Enums']['shotlocationsrebuilt'];
  howDefendable: number;

  tioiRating: number;
  throughputSpeed: number;
  driverSkill: number;

  incurredPenalties: boolean;
  lostComms: boolean;
  disabled: boolean;
  strategyText: string;
  commentText: string;
}

// Define the initial state
export const initialState: FormState = {
  matchType: 'match',

  nameText: "",
  matchNumber: "",
  teamNumber: "",
  selectedStation: "B1",

  selectedStartPosition: 'center-hub',
  autoClimb: false,
  autoClimbLocation: 'center',
  autoStrengthOfShooting: 3,
  autoIssues: '',
  autoDepot: false,
  autoOutpost: false,
  fuelTakenFromNeutralZone: 0,
  autoPathDetails: '{}',

  teleShotsMade: 0,
  teleFuelPassed: 0,
  teleFuelDozed: 0,
  //telePassLocations: '',
  defenseStrength: 3,
  playedDefense: false,
  defendBumpTrench: false,
  defendNeutral: false,
  defendAllianceZone: false,

  climbType: 'None',
  teleClimbLocation: 'center',
  teleClimbTime: '',

  tioiRating: 3,
  throughputSpeed: 3,

  shotLocations: 'cannot-shoot',
  howDefendable: 1,

  incurredPenalties: false,
  lostComms: false,
  disabled: false,
  driverSkill: 3,
  strategyText: '',
  commentText: '',
  telePoints: 0,
  endgamePoints: 0
};

// Define action types
export type FormAction =
  | { type: "UPDATE_FIELD"; field: keyof FormState; value: FormState[keyof FormState] }
  | { type: "RESET_FORM" };

// Reducer
function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

// Create context type
interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>;
};

// Hook
export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useForm must be used within a FormProvider");
  return context;
};
