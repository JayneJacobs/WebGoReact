import React, * as react from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';


const StyledDashboard = styled.div`
    padding-top: 1.5rem;
`;

import ReactJson from 'react-json-view';
import { Pty } from './Pty';

import { Prism } from './Prism.js';
import { Databases } from './Database.js';

export function Dashboard() {
    const appState = react.useContext(AppContext);
    const { rs, prismDataPath, showDatabaseOps } = react.useContext(AppContext);
    

    return (
        <StyledDashboard>
            <Databases />
            <Pty/>
            <div id="prism-path">{prismDataPath}</div>
            <Prism />
            <ReactJson src={appState} collapsed={true} />
            Ready State: { rs }
        </StyledDashboard>
    )
}