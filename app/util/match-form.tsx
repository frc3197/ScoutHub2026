import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { Database } from "../supabasetypes";

// Define the shape of your form state
export interface FormState {
  matchType: Database['public']['Enums']['matchscouttype'];

  nameText: string;
  matchNumber: string;
  teamNumber: string;
  selectedStation: Database['public']['Enums']['driverstation'];

  selectedStartPosition: Database['public']['Enums']['autostartpositionsreefscape'];
  autoL4Count: number;
  autoL3Count: number;
  autoL2Count: number;
  autoL1Count: number;
  autoMissCoralCount: number;
  autoNetCount: number;
  autoMissNetCount: number;
  autoProcessorCount: number;
  leave: boolean;

  teleL4Count: number;
  teleL3Count: number;
  teleL2Count: number;
  teleL1Count: number;
  teleMissCoralCount: number;
  teleNetCount: number;
  teleMissNetCount: number;
  teleProcessorCount: number;
  park: boolean;
  selectedClimb: string;

  lostComms: boolean;
  disabled: boolean;
  driverSkill: number;
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
  autoL4Count: 0,
  autoL3Count: 0,
  autoL2Count: 0,
  autoL1Count: 0,
  autoMissCoralCount: 0,
  autoNetCount: 0,
  autoMissNetCount: 0,
  autoProcessorCount: 0,
  leave: true,

  teleL4Count: 0,
  teleL3Count: 0,
  teleL2Count: 0,
  teleL1Count: 0,
  teleMissCoralCount: 0,
  teleNetCount: 0,
  teleMissNetCount: 0,
  teleProcessorCount: 0,
  park: false,
  selectedClimb: "No",

  lostComms: false,
  disabled: false,
  driverSkill: 3,
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
