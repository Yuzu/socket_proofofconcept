import { React, useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
    Paint
} from "./components"
import {io} from "socket.io-client"

const App = () => {

    const [socket, setSocket] = useState();

    useEffect(() => {
        const newIO = io("http://localhost:3000");
        setSocket(newIO);
        return () => newIO.close(); 
    }, [setSocket]);

    
    if (socket) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" render={() => <Paint socket={socket} />} />
                </Switch>
            </BrowserRouter>
        );
    }
    else {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" render={Paint} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App