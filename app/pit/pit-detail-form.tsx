import { Database } from '@/app/database.types';
import { createContext, Dispatch, useContext, useReducer } from 'react';

type PitScoutingRow = Database['public']['Tables']['Pit Scouting']['Row'];

type PitFormState = Pick<
  PitScoutingRow,
  'team_number' | 'driver_experience' | 'auto_description' | 'hopper_size' | 'shooter_type' | 'bump' | 'trench' | 'climb_type' | 'comments'
>;

const initialState: PitFormState = {
  team_number: -1,
  auto_description: '',
  driver_experience: '',
  hopper_size: -1,
  shooter_type: 'None',
  bump: false,
  trench: false,
  climb_type: 'No Climber',
  comments: '',
};

type Action =
  | { type: 'UPDATE_FIELD'; field: keyof PitFormState; value: PitFormState[keyof PitFormState] }
  | { type: 'RESET_FORM' };

function reducer(state: PitFormState, action: Action): PitFormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

type FormContextType = {
  state: PitFormState;
  dispatch: Dispatch<Action>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const PitFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const usePitForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('usePitForm must be used within a PitFormProvider');
  return context;
};