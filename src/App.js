import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './layouts/Home'
import MainScreen from './layouts/MainScreen';


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/main' component={MainScreen} exact />
                <Route component={Error} />
            </Switch>
        </BrowserRouter>
    );
}

export default App