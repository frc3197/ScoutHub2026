import { Database } from '@/app/supabasetypes';
import { createContext, Dispatch, useContext, useReducer } from 'react';

type PitScoutingRow = Database['public']['Tables']['Pit Scouting']['Row'];

type PitFormState = Pick<
  PitScoutingRow,
  'team_number' | 'driver_experience' | 'algae_description' | 'auto_description' | 'comments' | 'endgame_description'
>;

const initialState: PitFormState = {
  team_number: -1,
  driver_experience: '',
  algae_description: '',
  auto_description: '',
  endgame_description: '',
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