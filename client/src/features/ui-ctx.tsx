import React, { createContext, useReducer, useState } from "react";
import uiRed, { UiState, UiActionType, UiStateType } from "../reducers/ui-red";

interface Value {
  state: UiStateType;
  dispatch: React.Dispatch<UiActionType>;
}

export const UiCtx = createContext<Value>({
  state: UiState,
  dispatch: () => {},
});

const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiRed, UiState);

  return (
    <UiCtx.Provider
      value={{
        state,
        dispatch: dispatch,
      }}
    >
      {children}
    </UiCtx.Provider>
  );
};

export default UiProvider;
