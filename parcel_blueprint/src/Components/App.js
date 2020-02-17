import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// Hook based context :: from default fuction
import AppProvider from './AppContext.js';




const StyledApp = styled.div`
border: 1px solid #f00
`;

import { Dashboard } from './Dashboard.js';

export function App() {
    return(
        <StyledApp>
            <AppProvider>
                <Dashboard />
            </AppProvider>
        </StyledApp>
    )
}


if (document.getElementById('react_root')) {
    ReactDOM.render(<App />, document.getElementById('react_root'));
}
