import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledApp = styled.div`
border: 1px solid #f00
`;

export function App() {
    return(
        <StyledApp>
            This is the node App
        </StyledApp>
    )
}


if (document.getElementById('react_root')) {
    ReactDOM.render(<App />, document.getElementById('react_root'));
}