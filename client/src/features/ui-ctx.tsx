import React, { createContext, useReducer, useState } from "react";
import uiRed, { UiState, UiActionType, UiStateType } from "../reducers/ui-red";

interface Value {
  state: UiStateType;
  dispatch: React.Dispatch<UiActionType>;
  hasInteracted: boolean;
  setHasInteracted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UiCtx = createContext<Value>({
  state: UiState,
  dispatch: () => {},
  hasInteracted: false,
  setHasInteracted: () => {},
});

const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiRed, UiState);
  const [hasInteracted, setHasInteracted] = useState(false);
  return (
    <UiCtx.Provider
      value={{
        state,
        dispatch: dispatch,
        hasInteracted,
        setHasInteracted,
      }}
    >
      {children}
    </UiCtx.Provider>
  );
};

export default UiProvider;
