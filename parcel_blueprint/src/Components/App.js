import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// Hook based context :: from default fuction
import AppProvider from './AppContext.js';




const StyledApp = styled.div`

`;

import { Dashboard } from './Dashboard.js';
import { NavBar } from './NavBar.js'
export function App() {
    return(
        <StyledApp>
            <AppProvider>
                <NavBar/>
                <Dashboard />
            </AppProvider>
        </StyledApp>
    )
}


if (document.getElementById('react_root')) {
    ReactDOM.render(<App />, document.getElementById('react_root'));
}
