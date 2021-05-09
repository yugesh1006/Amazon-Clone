import React,{createContext,useContext ,useReducer} from "react";

export const StateContext =createContext();

export const Stateprovider =({reducer,intialState,children}) => (
    <StateContext.Provider value ={useReducer(reducer,intialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);