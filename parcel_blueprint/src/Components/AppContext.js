import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
export const AppContext = createContext();


export default function(props) {
    const [ test, setTest ] = useState('This is AppContext');
    const [ rs, setRs ] = useState(0);
    const [ ws, setWs ] = useState(null);

    const [ wsId, setWsId ] = useState('');
    const [ jwt, setJwt ] = useState("^vAr^");


    const [ user, setUser ] = useState('');
    const [ verifiedJwt, setVerifiedJwt ] = useState(null);



    const [modal, setModal] = useState('none');
    const [loginErrMsg, setLoginErrMsg] = useState('');

    const [loading, setLoading] = useState(true);

    const [ dropMenu, setDropMenu ] = useState('none');
    const [ dropMenuLeft, setDropMenuLeft ] = useState(null);
    const [ dropMenuRight, setDropMenuRight ] = useState(null);
    const [ adminSidebar, setAdminSidebar ] = useState(null);

    const [ frontEnd, setFrontEnd ] = useState(null);
    const [ backEnd, setBackEnd ] = useState(null);
    const [ documentation, setDocumentation ] = useState(null);
 
    const [ prismData, setPrismData ] = useState('Default Prism Data This is not enough to fill a window');
    const [ prismDataPath, setPrismDataPath ] = useState('Welcome Message from Prism and some more to fill up space...');

    const [ websocketClients, setWebsocketClients ] = useState(null);

    const [ mySqlDatabases , setMySqlDatabases ] = useState(null);
    const [ showDatabaseOps, setShowDatabaseOps] = useState(false);
    const request = async(jwt, type, data) => {
        let payload = {
            jwt,
            type,
            data
        };
        ws.send(JSON.stringify(payload));
        console.log(JSON.stringify(payload));
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
                    setRs(ws.readyState);
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
                console.log("this is the event: ");
                console.log(event);
                let tjo = JSON.parse(event.data);
                switch(tjo['type']) {
                    case "server-ws-connect-success-msg":
                        setWsId(tjo['data']);
                        alert("server ws connected: ");
                        request("^vAr^", 'get-fs-path', '/var/www/VFS/documentation');
                        request("^vAr^", 'get-fs-path', '/var/www/VFS/frontendCode');
                        request("^vAr^", 'get-fs-path', '/var/www/VFS/backendCode');
                        console.log("connected to ws");
                        break;
                    case "server-ws-connect-success-jwt":
                        alert("server ws jwt success ");
                        setJwt(tjo['data']); 
                        let usr = JSON.parse(tjo['data']);
                        setUser(usr);
                        request(tjo['jwt'], 'validate-jwt', 'noop');
                        setModal('none');
                        break;
                    case "server-ws-connect-login-failure":
                        setLoginErrMsg(tjo['data']);
                        alert("Login Failure: ");
                        break;
                    case "user-already-exists":
                        alert("User Exists: ");
                        break;
                    case "toast-success":
                        alert("toast-cuccess: ");
                        setModal('none');
                        break;
                    case "user-created-successfully":
                        alert("User Created: ");
                        setModal('none');
                        break;
                    case "server-ws-connect-jwt-verified":
                        setVerifiedJwt(true);
                        alert("connect jwt: ");
                        break;
                    case "server-ws-connect-stored-jwt-verified":
                        setVerifiedJwt(true);
                        setJwt(window.localStorage.getItem('Pr0conJwt'));
                        let storedUser = window.localStorage.getItem('User');
                        setUser(JSON.parse(storedUser));
                        setLoading(false);
                        break;
                    case "stored-jwt-token-invalid":
                        alert("token invalid ");
                        setJwt("^vAr^");
                        setUser(null);
                        setLoading(false);
                        if(window.localStorage.getItem('Pr0conJwt') !== null) {
                            window.localStorage.removeItem('Pr0conJwt');
                        }
                        break;
                    case "return-file-data":
                        alert("file data return: ");
                        setPrismData(tjo['data']);
                        break; 
                    case "websocket-client-list":
                        alert("websocket client list: ");
                        setWebsocketClients(JSON.parse(tjo['data']));
                        break;  
                    default:
                        break;
                }
            switch(tjo['path']) {
                case "/var/www/VFS/frontendCode":
                    console.log("Got frontendCode");
                    setFrontEnd(tjo);
                    break;
                case "/var/www/VFS/backendCode":
                    setBackEnd(tjo);
                    console.log("Got backendCode");
                    break;
                case "/var/www/VFS/documentation":
                    console.log("Got documentation");
                    setDocumentation(tjo);
                    break;
            }
        }       
        ws.onclose = function(close_event) {
                console.log(close_event);
            }
        ws.onclose = function(open_event) {
                console.log(open_event);
            }
        ws.onerror = function(error_event) {
                console.log(error_event);
        }
           console.log("Sending Request message")
           request('^vAr^','register-client-message','noop');
        }
    }


    useEffect(() => {
        if(ws === null) { setWs(new WebSocket('wss://pr0con.selfmanagedmusician.com:1200/ws')); }
        if(ws !== null && rs === 0) { configureWebsocket(); heartbeat(ws); }
    }, [ws, rs])

    useEffect(() => {
        console.log("AppContext forst useEffect JJNoteuseEffect");
        if (jwt !== '^vAr^' && verifiedJwt) {
            console.log(jwt);
            console.log("JWT has been verified..."+verifiedJwt);
            window.localStorage.setItem('Pr0conJwt',jwt);
            window.localStorage.setItem('User',JSON.stringify(user));
        }
    },[verifiedJwt])

    useEffect(() => {
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
    },[rs])

    const doLogOut = async() => {
        console.log('InLogOUt');
		setJwt('^vAr^');
		setUser(null);
		setVerifiedJwt(null);
		window.localStorage.removeItem('Pr0conJwt'); 
    }

    useEffect(() => {
        if (loading === false) {
            const fetchData = async () => {
                const resL = await axios('https://pr0con.selfmanagedmusician.com:1200/rest/api/ui/navbar-drop-menu-resources');
                const resR = await axios('https://pr0con.selfmanagedmusician.com:1200/rest/api/ui/navbar-drop-menu-profile');
                console.log(resL.data.elements);
                console.log(resR.data.elements);
                setDropMenuLeft(resL.data.elements);
                setDropMenuRight(resR.data.elements);

                const asd = await axios('https://pr0con.selfmanagedmusician.com1200/rest/api/ui/administration-sidebar');
				setAdminSidebar(asd.data.elements);
            }
            fetchData();  
        }
    },[loading])

    return (
        <AppContext.Provider value={{
            test, setTest,
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

            prismData,
            prismDataPath,

            doLogOut,
            setBackEnd,
            setDocumentation,
            setFrontEnd,
            adminSidebar,

            frontEnd,
            backEnd,
            documentation,
 
            setPrismDataPath,
            setAdminSidebar,
			mySqlDatabases,
			showDatabaseOps, 
			setShowDatabaseOps,
			
			websocketClients,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
