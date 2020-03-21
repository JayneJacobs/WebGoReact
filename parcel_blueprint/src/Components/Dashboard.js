import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js'


const StyledDashboard = styled.div`
    margin-top: 6.5rem;
    position: relative;
`;

import ReactJson from 'react-json-view';
import { Loader } from './Loader'
export function Dashboard() {
    const appState = useContext(AppContext)
    const { rs, loading } = useContext(AppContext)

    return (
        <StyledDashboard>
            <ReactJson src={appState} collapsed={true} />
           Ready State: { rs }
           { loading === true &&  < Loader /> } 
        </StyledDashboard>
    )
}