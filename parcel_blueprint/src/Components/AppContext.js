import React, { useEffect, useState, createContext } from  'react'; 
import axios from 'axios';


export const AppContext = createContext();

export default function(props) {
    const [ test, setTest ] = useState('This is AppContext');

    return(
        <AppContext.Provider value={[
            test, setTest,
        ]}>
            { props.children }
        </AppContext.Provider>
    )
}