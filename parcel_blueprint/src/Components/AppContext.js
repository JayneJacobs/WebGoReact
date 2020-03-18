import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
export const AppContext = createContext();


export default function(props) {
    const [test, setTest] = useState('This is AppContext');
    const [rs, setRs] = useState(0);
    const [ws, setWs] = useState(null);

    const [wsId, setWsId] = useState('');
    const [jwt, setJwt] = useState(null);
    const [user, setUser] = useState('');
    const [modal, setModal] = useState('none');
    const [loginErrMsg, setloginErrMsg] = useState('');

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
                        let usr = JSON.parse(tjo['data'])
                        request(tjo['jwt'], 'validate-jwt', 'noop');
                        setModal('none');
                        break;
                    case "server-ws-connect-login-failure":
                        setloginErrMsg(tjo['data'])
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
    }, [ws, rs])

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
            loginErrMsg
        }}>
            {props.children}
        </AppContext.Provider>
    )
}