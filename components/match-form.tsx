import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { Database } from "../app/supabasetypes";

// Define the shape of your form state
export interface FormState {
  matchType: Database['public']['Enums']['matchscouttype'];

  nameText: string;
  matchNumber: string;
  teamNumber: string;
  selectedStation: Database['public']['Enums']['driverstation'];

  selectedStartPosition: Database['public']['Enums']['autostartpositionsreefscape'];
  autoClimb: boolean;
  autoClimbLocation: string;
  autoStrengthOfShooting: number;
  autoIssues: string;
  fuelTakenFromNeutralZone: number;
  autoPathDetails: string;

  teleShotsMade: number;
  teleFuelPassed: number;
  teleFuelPushed: number;
  telePassLocations: string;

  defenseStrength: number;
  foulsIncurred: number;
  playedDefense: boolean;
  defendBumpTrench: boolean;
  defendNeutral: boolean;
  defendAllianceZone: boolean;

  climbType: string;
  teleClimbLocation: string;
  teleClimbTime: string;

  tioiRating: number;
  throughputSpeed: number;

  incurredPenalties: boolean;
  lostComms: boolean;
  disabled: boolean;
  driverSkill: number;
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

  selectedStartPosition: 'Far',
  autoClimb: false,
  autoClimbLocation: '',
  autoStrengthOfShooting: 3,
  autoIssues: '',
  fuelTakenFromNeutralZone: 0,
  autoPathDetails: '{}',

  teleShotsMade: 0,
  teleFuelPassed: 0,
  teleFuelPushed: 0,
  telePassLocations: '',
  defenseStrength: 0,
  foulsIncurred: 0,
  playedDefense: false,
  defendBumpTrench: false,
  defendNeutral: false,
  defendAllianceZone: false,

  climbType: 'No attempt',
  teleClimbLocation: '',
  teleClimbTime: '',

  tioiRating: 3,
  throughputSpeed: 3,

  incurredPenalties: false,
  lostComms: false,
  disabled: false,
  driverSkill: 3,
  strategyText: '',
  commentText: "",
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
