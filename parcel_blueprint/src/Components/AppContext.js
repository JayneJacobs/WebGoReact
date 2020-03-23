import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
export const AppContext = createContext();


export default function(props) {
    const [test, setTest] = useState('This is AppContext');
    const [rs, setRs] = useState(0);
    const [ws, setWs] = useState(null);

    const [wsId, setWsId] = useState('');
    const [jwt, setJwt] = useState("^vAr^");
    const [ verifiedJwt, setVerifiedJwt ] = useState(null);


    const [user, setUser] = useState('');

    const [modal, setModal] = useState('none');
    const [loginErrMsg, setLoginErrMsg] = useState('');
    const [loading, setLoading] = useState(true);

    const [ dropMenu, setDropMenu ] = useState('none');
    const [ dropMenuLeft, setDropMenuLeft ] = useState(null);
    const [ dropMenuRight, setDropMenuRight ] = useState(null);
    const request = async(jwt, type, data) => {
        let payload = {
            jwt,
            type,
            data
        };
        ws.send(JSON.stringify(payload));
    }

    const heartbeat = async (ws) => {
        setTimeout(
            function () {
                //console.log(ws.readyState)
                /* 0 CONNECTING    Socket ahs been created. The connection is not yest open.
                // 1 OPEN          The connection is open and ready to communicate. 
                // 2 CLOSING       The connection is in the processd of CLOSING
                   3 CLOSED        The connection is closed or couldn't be opened. 
                */

                if (rs !== ws.readyState) {
                    setRs(ws.readyState)
                }
                heartbeat(ws);
            }
                .bind(this),
            1000
        );
    }

    const configureWebsocket = async() => {
        ws.onopen = function(open_event) {
            ws.onmessage = function(event) {
                console.log(event);
                let tjo = JSON.parse(event.data);
                switch(tjo['type']) {
                    case "server-ws-connect-success-msg":
                        setWsId(tjo['data']);
                        break;
                    case "server-ws-connect-success-jwt":
                        setJwt(tjo['data']);
                        let usr = JSON.parse(tjo['data']);
                        setUser(usr);
                        request(tjo['jwt'], 'validate-jwt', 'noop');
                        setModal('none');
                        break;
                    case "server-ws-connect-login-failure":
                        setLoginErrMsg(tjo['data']);
                        break;
                    case "user-already-exists":
                        alert("User Exists: ");
                        break;
                    case "toast-success":
                        setModal('none');
                        break;
                    case "user-created-successfully":
                        setModal('none');
                        break;
                    case "server-ws-connect-jwt-verified":
                        setVerifiedJwt(true);
                        break;
                    case "server-ws-connect-stored-jwt-verified":
                        setVerifiedJwt(true);
                        setJwt(window.localStorage.getItem('Pr0conJwt'));
                        let storedUser = window.localStorage.getItem('User');
                        setUser(JSON.parse(storedUser));
                        break;
                    case "stored-jwt-token-invalid":
                        setJwt("^vAr^");
                        setUser(null);
                        setLoading(false);
                        if(window.localStorage.getItem('Pr0conJwt') !== null) {
                            window.localStorage.removeItem('Pr0conJwt');
                        }
                        break;
                    default:
                        break;
                }
            }
            ws.onclose = function(close_event) {
                console.log(close_event);
            }
            ws.onerror = function(error_event) {
                console.log(error_event);
            }
            request('^vAr^', 'register-client-message', 'noop');
        }
    }


    useEffect(() => {
        if(ws === null) { setWs(new WebSocket('wss://pr0con.selfmanagedmusician.com:1200/ws')); }
        if(ws !== null && rs === 0) { configureWebsocket(); heartbeat(ws); }
    }, [ws, rs]);

    useEffect(() =>{
        console.log("AppContext forst useEffect");
        if (jwt !== '^vAr^' && verifiedJwt) {
            console.log(jwt);
            console.log("JWT has been verified..."+verifiedJwt);
            window.localStorage.setItem('Pr0conJwt',jwt);
            window.localStorage.setItem('User',JSON.stringify(user));
        }
    },[verifiedJwt]);

    useEffect(() =>{
        console.log("AppContext Second useEffect");
        if ( rs === 1 ) {
            let storedJwt = window.localStorage.getItem('Pr0con.Jwt');
            if(storedJwt !== null) {
                let psjwt = JSON.parse(atob(storedJwt.split('.')[1]));
                let exp = new Date(psjwt['exp']* 1000).toUTCString();
                let now = new Date(Date.now()).toUTCString();

                console.log(now);
                console.log(exp);
                if(exp > now) {
                    console.log('Stored Jwt');
                    ws.request(storedJwt,'validate-stored-jwt-token','noop');
                }
                if(exp < now) {  
                    setLoading(false);
                    window.localStorage.removeItem('Pr0conJwt');
                }
            } else if (storedJwt === null){
                    setLoading(false);
            }
        }
    },[rs]);

    useEffect(() => {
        if (loading === false) {
            const fetchData = async () => {
                const resL = await axios('https://pr0con.selfmanagedmusician.com:1200/rest/api/ui/navbar-drop-menu-resources');
                const resR = await axios('https://pr0con.selfmanagedmusician.com:1200/rest/api/ui/navbar-drop-menu-profile');
                console.log(resL.data.elements);
                console.log(resR.data.elements);
                setDropMenuLeft(resL.data.elements);
                setDropMenuRight(resR.data.elements);
            }
            fetchData();
                
        }
        
    },[loading]);

    const doLogOut = async() => {
		setJwt('^vAr^');
		setUser(null);
		setVerifiedJwt(null);
		window.localStorage.removeItem('Pr0conJwt'); 
    }
    
    return (
        <AppContext.Provider value={{
            test,
            setTest,
            rs,
            request,
            wsId,
            jwt,
            user,
            modal,
            setModal,
            loginErrMsg,
            loading,
            verifiedJwt,
            dropMenu,
            setDropMenu,
            dropMenuLeft,
            dropMenuRight,

            doLogOut,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}