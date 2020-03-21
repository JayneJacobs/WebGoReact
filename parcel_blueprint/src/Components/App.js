import React, { useState, useEffect, useContext } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// Hook based context :: from default fuction
import AppProvider from './AppContext.js';
import { AppContext } from './AppContext.js';


const StyledApp = styled.div`
	#app-content {
		position: fixed;
		z-index: 2;
		
		width: 10vw;
		top: 0px;
		left: 0px;
		
		height: 6.5rem;
		box-shadow: 0 0 1px 1px rgba(20,23,28,.1),0 3px 1px 0 rgba(20,23,28,.1);
		
		font-size: 2rem;
		color: #505763;
		background-color: #006;
		
		font-family: 'Hackman-Bold';
`;

import { Dashboard } from './Dashboard.js';
import { NavBar } from './NavBar.js';
import { LogInModal } from './Modals/LoginModal.js';
import { SignUpModal } from './Modals/SignupModal.js';


export function App() {

	return (
		<StyledApp>
			<AppProvider>
				<AppContext.Consumer>
					{({ modal }) => (
						<>
							<NavBar id="app-content" />
							<Dashboard />
							{modal === 'login' && <LogInModal />}
							{modal === 'signup' && < SignUpModal />}
						</>
					)}
				</AppContext.Consumer>
			</AppProvider>
		</StyledApp>
	)
}


if(document.getElementById('react_root')) {
	ReactDOM.render(<App />, document.getElementById('react_root'));
}
