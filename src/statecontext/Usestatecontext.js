import React, { createContext, useState } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
    const [sharedState, setSharedState] = useState('');

    const [qname, qsetname] = useState('');

    return (
        <SharedStateContext.Provider value={{ sharedState, setSharedState, qname, qsetname }}>
            {children}
        </SharedStateContext.Provider>
    );
};

export default SharedStateContext;
