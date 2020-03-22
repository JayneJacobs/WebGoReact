import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';


const StyledDropMenuLeft = styled.div`
	position: absolute;
	z-index: 4;
	top: 6.5rem;
	left: 18rem;
	min-width: 30rem;
	min-height: 10rem;
	border: none;
	border-bottom-left-radius: 2px;
	border-bottom-right-radius: 2px;
	border-top: 1px solid #e8e9eb;
	box-shadow: 0 4px 16px rgba(20,23,28,.25);
	color: #505763;
	font-size: 13px;
	background: #fff;
	padding: 15px 0 15px 0;
	
	
	font-family: 'Hackman';
	-moz-osx-font-smoothing: grayscale;
		
	&:after{
		right: 12px;
		left: 12px;
		border-color: transparent transparent #fff transparent;
		top: -12px;
		box-sizing: border-box;
		border-style: solid;
		border-width: 0 10px 13px;
		content: '' !important;
		height: 0;
		position: absolute;
		width: 0;	
	}
	
	.icon-text-link-item {
		width: 100%;
		color: #007791;
		font-size: 1.5rem;
		font-weight: 400;
		display:flex;
		padding: 5px 15px;
		flex-direction: row;
		align-items: center;
		max-height: 3rem;

	}
	.icon-text-link-item:hover {
		background: #f2f3f5;
		cursor:pointer;
	}	
`;

export function DropMenuLeft() {
    const { dropMenuLeft, setDropMenu } = useContext(AppContext)
   return(
    <StyledDropMenuLeft>
        drop menu left
    </ StyledDropMenuLeft>
    )
}