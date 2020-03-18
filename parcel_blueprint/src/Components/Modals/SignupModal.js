import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../AppContext.js';


const StyledSignUpModal = styled.div`
position: fixed;
z-index: 0;
width: 100vw;
height: 100vh;
top: 0px;
left: 0px;
overflow: hidden;
background-color: rgba(41,48,59,.8);
z-index: 4;

#sign-up-center-dialog {
    position: relative;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    border-radius: 6px;
    background: #fff;
    color: #29303b;
    max-width: 380px;
    max-height: 500px;
    box-shadow: 0 0 1px 1px;
    rgba(20,23,28,.1),0 3px 1px 0 rgba(20,23,28,.1);
    
    #sign-up-center-dialog-header {
        border-bottom: solid 1px #dedfe0;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        color: #29303b;
        display: block;
        font-weight: 600;
        font-size: 20px;
        padding: 24px 24px 24px 24px;
        
        #sign-up-center-dialog-header-text {
            display: inline-block;
        }
        #sign-up-center-dialog-header-close {
            font-size: 3.6rem;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: #686f7a;
            -webkit-mask: url('/icons/20px/cross.svg');
            mask: url('/icons/20px/cross.svg');
            float: right;
            top: 2px;
            position: relative;	
            
            &:hover {
                cursor:pointer;
            }					
        }
            
    }
    #sign-up-center-dialog-form {
        padding: 24px 24px 24px 24px;
                    
        #sign-up-validation-errors {
            padding: 1.6rem;
            font-size: 1.5rem;
            border-radius: .2rem;
                border: 1px solid transparent; 
                border-color: transparent;
            background-color: #faebeb;
            color: #521822;
            font-weight: 400;
        }	
                    
        #sign-up-center-dialog-form-full-name-field,
        #sign-up-center-dialog-form-email-field,
        #sign-up-center-dialog-form-password-field {
            display: inline-block;
            position: relative;
            
            input {
                border-radius: 5px;
                width: 100%;
                color:
                #29303b;
                font-size: 18px;
                height: auto;
                padding: 11px 60px 12px 40px;
                border: 1px solid;
                #cacbcc;				
            }
        }
        
        #sign-up-center-dialog-form-full-name-field:before {
            width: 1.8rem;
            height: 1.8rem;
            content: '';
            -webkit-mask: url('/icons/20px/new-person.svg');
            mask: url('/icons/20px/new-person.svg');
            position: absolute;
            top: 50%;
            left: 10px;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            background: #cacbcc;
        }			
        #sign-up-center-dialog-form-email-field:before {
            width: 1.8rem;
            height: 1.8rem;
            content: '';
            -webkit-mask: url('/icons/20px/envelope.svg');
            mask: url('/icons/20px/envelope.svg');
            position: absolute;
            top: 50%;
            left: 10px;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            background: #cacbcc;
        }
        #sign-up-center-dialog-form-password-field:before {
            width: 1.8rem;
            height: 1.8rem;
            content: '';
            -webkit-mask: url('/icons/20px/lock.svg');
            mask: url('/icons/20px/lock.svg');
            position: absolute;
            top: 50%;
            left: 10px;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            background: #cacbcc;			
        }
        
        #sign-up-password-strength-indicator span {
            width: 42px;
            height: 4px;
            background: #dedfe0;
            display: inline-block;
            position: relative;				
        }		
        #sign-up-password-strength-indicator span:not(:first-child) {
            margin-left: 2px;	
        }
        
        #submit-sign-up-form-btn {
            width: 100%;
            height: 4.8rem;
            text-align: center;
            line-height: 4.8rem;
            font-size: 1.8rem;
            color: #fff;
            background-color: #ec5252;
            border: 1px solid transparent;
                border-top-color: transparent;
                border-right-color: transparent;
                border-bottom-color: transparent;
                border-left-color: transparent;
            border-radius: 2px;
            font-family: 'Hackman-Bold';	
            
            &:hover {
                color: #fff;
                background-color: #992337;
                border-color:
                transparent;
                cursor: pointer;
            }		
        }
        

        #sign-up-center-dialog-form-full-name-field,
        #sign-up-center-dialog-form-email-field,
        #sign-up-center-dialog-form-password-field,
        #submit-sign-up-form-btn {
            margin-top: .5rem;
        }
    }	
}	
`;

export function SignUpModal() {
    const { request, setModal } = useContext(AppContext);

    const [u, setU] = useState(''); //user
    const [e, setE] = useState(''); //password...	
    const [p, setP] = useState(''); //password...	


    const [errAFR, setErrAFR] = useState(false);  //all fields required err
    const [errENV, setErrEnv] = useState(false);	//email not valid
    const [errPSE, setErrPSE] = useState(false);	//password strength err	

    function emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleSubmit = async () => {
        setErrAFR(false);
        setErrEnv(false);
        setErrPSE(false);

        if (u == "" || e == "" || p == "") {
            setErrAFR(true);
            return;
        }
        if (!emailIsValid(e)) {
            setErrEnv(true);
            return;
        }

		/*  ^	The password string will start this way 
			(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
			(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
			(?=.*[0-9])	The string must contain at least 1 numeric character
			(?=.[!@#\$%\^&])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
			(?=.{8,})	The string must be eight characters or longer
		*/
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        //Generally you proabably want to validate & Sanitize input on the server side as well
        //cause whos to say they couldn't modify the javasript to always be true.
        if (!strongRegex.test(p)) {
            setErrPSE(true);
            return;
        }
        // the following allows base64 encoding of the email and password
        let create_user = {
            name: u,
            email: btoa(e),
            password: btoa(p),
        }

        request("vAr", "create-user", JSON.stringify(create_user));
    }

    return (
        <StyledSignUpModal>
            <div id="sign-up-center-dialog">
                <div id="sign-up-center-dialog-header">
                    <div id="sign-up-center-dialog-header-text">Sign Up</div>
                    <div id="sign-up-center-dialog-header-close" onClick={(e) => setModal('none')} ></div>
                </div>

                <div id="sign-up-center-dialog-form">

                    {(errAFR === true || errENV === true || errPSE === true) &&
                        <div id="sign-up-validation-errors">
                            Form Validation Errors.
							<ul>
                                {errAFR && <li>All Fields Required</li>}
                                {errENV && <li>Email is not valid.</li>}


                                { errPSE &&
                                    <>
                                        <li>Password Needs Upper Case Letter</li>
                                        <li>Password Needs Lower Case Letter</li>
                                        <li>Password Needs at least 1 Number</li>
                                        <li>Password Needs 8 or More Characters</li>
                                        <li>Password Needs at leat 1 Special Character</li>
                                    </>
                                }
                            </ul>
                        </div>
                    }
                    <span id="sign-up-center-dialog-form-full-name-field"><input type="text" placeholder="Full Name" onChange={(e) => setU(e.target.value)} /></span>

                    <span id="sign-up-center-dialog-form-email-field"><input type="text" placeholder="Email" onChange={(e) => setE(e.target.value)} /></span>
                    <span id="sign-up-center-dialog-form-password-field"><input type="password" placeholder="Password" onChange={(e) => setP(e.target.value)} /></span>

                    <div id="sign-up-password-strength-indicator"><span class="pwd-has-upper-lower"></span><span class="pwd-has-number"></span><span class="pwd-is-special"></span><span class="pwd-is-long"></span></div>
                    <div id="submit-signup-form-btn" onClick={(e) => handleSubmit()}>SignUp</div>
                </div>
            </div>
        </StyledSignUpModal>
    )
}

