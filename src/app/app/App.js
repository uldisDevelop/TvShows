import React from 'react';
import Program from '../shows/components/_Page';
import Home from '../Home/Home';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './App.scss'


export default function App() {
    
    return (
        <Router>
            <Switch>
                <Route path="/shows">
                    <Program />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

