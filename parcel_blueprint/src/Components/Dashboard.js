import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js'


const StyledDashboard = styled.div`
    position: fixed;
    z-index: 2;
    width: 100 visitWithTypeInfo;
    top: 0px;

    height: 6.5rem;

    box-shadow: 0 0 1px 1px rgba(20,23,28,.1),0 3px 1px rgba(20,23,28,.1);
    font-size: 2rem
    color: #505763;
    background: #000;

    font-family: "Hackman-Bold';
`;

import ReactJson from 'react-json-view';

export function Dashboard() {
    const appState = useContext(AppContext)

    return(
        <StyledDashboard>
            <ReactJson src={appState}  collapsed={true} />
        </StyledDashboard>
    )
}