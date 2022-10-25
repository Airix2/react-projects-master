import React, { useState, useContext, createContext } from "react";

export const AppContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "SHOW_MODAL":
            return state;
    }
    return state;
}

const initialState = {
    isModalVisible: false,
    isSidebarVisible: false,
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
};
