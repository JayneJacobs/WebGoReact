import React, { useState, useEffect, useContext } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// Hook based context :: from default fuction
import AppProvider from './AppContext.js';
import { AppContext } from './AppContext.js';



const StyledApp = styled.div`
`;

import { Dashboard } from './Dashboard.js';
import { NavBar } from './NavBar.js';
import { LogInModal } from './Modals/LoginModal.js';
import { SignUpModal } from './Modals/SignupModal.js';
import { Loader } from './Loader';


export function App() {
	return (
		<StyledApp>
			<AppProvider>
				<AppContext.Consumer>
					{({ loading, modal, setModal, setDropMenu }) => (
						<>
							<NavBar />

							{modal === 'login' && <LogInModal />}
							{modal === 'signup' && < SignUpModal />}
							<div id="app-content" onHover={ (e) => setDropMenu('none') } >
							<div id="app-content-left" >
							</div>
								<div id="app-content-right">
									<Dashboard />
								</div>
							</div>
							{ loading === true &&  < Loader /> } 
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
