import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';


const StyledDashboard = styled.div`
    padding-top: 1.5rem;
`;

import ReactJson from 'react-json-view';
import { Pty } from './Pty';

export function Dashboard() {
    const appState = useContext(AppContext);
    const { rs } = useContext(AppContext);

    return (
        <StyledDashboard>
            <ReactJson src={appState} collapsed={true} />
           Ready State: { rs }
        <Pty/>
        </StyledDashboard>
    )
}