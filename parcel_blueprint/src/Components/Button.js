import React, { useContext } from 'react';
import styled from 'styled-components';


const StyledButton = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-left: .5rem;

	.grey-button,
	.white-button,
	.red-button {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}


	.icon-button.icon {
	    position: relative;
		display: inline-block;
	    width: 2rem;
	    height: 2rem;
	    lineHeight: 2rem;
	    background: #ccc;
	    
	    -webkit-mask: url( ${props => props.icon} ) no-repeat center;
	    mask: url( ${props => props.icon} ) no-repeat center;
	}
	.icon-button.text {
	    border-radius: .2rem;
	    line-height: 2rem;
	    font-size: 1.5rem;
	    color: #686f7a;
	}

	.grey-button {
		border-radius: .2rem;
		font-size: 1.5rem;
		color: #686f7a;  
		border: 1px solid #686f7a;
		margin-left: .5rem;
		color: #505763;
		border-radius: 3px;
		background-color: #fff;
		border: 1px solid transparent;
	}
	.grey-button:hover {
		background-color: rgba(20,23.28,.05);
		cursor: pointer;
		border: 1px solid gba(20,23.28,.05);
		border-color: transparent;
		color: fff;
	}
	.red-button {
		border-radius: .2rem;
		font-size: 1.5rem;
		color: #686f7a;  
		border: 1px solid #686f7a;
		margin-left: .5rem;
		color: #505763;
		border-radius: 3px;
		background-color: #fff;
		border: 1px solid transparent;
	}
	.red-button:hover {
		background-color: rgba(20,23.28,.05);
		cursor: pointer;
		color: fff;
		border: 1px solid gba(20,23.28,.05);
		border-color: transparent;
	}
	.white-button {
		border-radius: .2rem;
		font-size: 1.5rem;
		color: #686f7a;
		border: 1px solid #686f7a;
		margin-left: .5rem;	
	}
	.white-button:hover {
		cursor: pointer;
		color: #29303b;
		border-color: #29303b;
	}
	:hover {
		cursor:pointer;
	}
		
	${({ btype }) => btype == "blue" && `
		text-decoration: underline;
	`}
`;

export function Button({ btype, text, icon, onClick }) {
	const handleClick = async () => {
		onClick();
	}
	return (
		<StyledButton btype={btype} icon={icon} onClick={ (e) => handleClick() }>
			{ btype === "icon-button" && <div className={ `${ btype } icon` }></div> }
			<div className={ `${ btype } text` }>{ text }</div>

		</StyledButton>
	)
}