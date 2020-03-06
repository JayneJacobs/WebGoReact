import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// Hook based context :: from default fuction
import AppProvider from './AppContext.js';
import { AppContext } from './AppContext.js';
 

const StyledApp = styled.div`
	#app-content {
		background-color: 532;
		position: relative;
		top: 6.5rem;
		margin: 0 auto;
		
		width: 120rem;
		
		display: grid;
		grid-template-columns: 32rem 86.5rem;
		grid-column-gap: 1.5rem;
		
		#app-content-left {
			padding-top: 1.5rem;
		}
	}
`;

import { Dashboard } from './Dashboard.js';
import { NavBar } from './NavBar.js';

export function App() {
    return(<>
        <StyledApp> 
			<AppProvider>
                <NavBar />
				<Dashboard />
            </AppProvider>
        </StyledApp>
    )
}


if (document.getElementById('react_root')) {
    ReactDOM.render(<App />, document.getElementById('react_root'));
}
