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
	.blue-button {
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
		mask: url(${props => props.icon}) no-repeat center;
	}

	.icon-button.text {
		font-size: 1.5rem;
		color: #686f7a;
		line-height: 2rem;
		margin-left: .5rem;
	}

	.grey-button {
		border-radius: .2rem;
		font-size: 1.5rem;
		color: #686f7a;
		border: 1px solid #686f7a;
		margin-left: .5rem;
		color: #f55;
		background-color: #52ec52;
		border: 1px solid transparent;	
	}
	.grey-button:hover {
		color: #fff;
		background-color: #992337;
		border-color: transparent;
		cursor: pointer;	
	}	

	.white-button {
		border-radius: .2rem;
		font-size: 1.5rem;
		color: #686f7a;
		border: 1px solid #686f7a;
		margin-left: .5rem;	
	}
	.white-button:hover {
		color: #fff;
		background-color: #992337;
		border-color: transparent;
		cursor: pointer;	
	}

	.blue-button {
		border-radius: .2rem;
		font-size: 1.5rem;
		color: #686f7a;
		border: 1px solid #686f7a;
		margin-left: .5rem;
		color: #f66;
		background-color: #ec5252;
		border: 1px solid transparent;	
	}

	.blue-button:hover {
		color: #fff;
		background-color: #992337;
		border-color: transparent;
		cursor: pointer;	
	}

	:hover {
		cursor:pointer;
	}

	${({ btype }) => btype == "blue" && `
		text-decoration: underline;
	`}
`;


export function Button({ btype, text, icon, onClick, onMouseOver }) {
	
	const handleClick = async() => {
		onClick();
	}
	
	return(
		<StyledButton btype={btype} icon={icon} onClick={(e) => handleClick()} onMouseOver={onMouseOver}  >
			{ btype === "icon-button" && <div className={`${btype} icon`}></div> }
			<div className={`${btype} text`}>{text}</div>	
		</StyledButton>
	)	
} 