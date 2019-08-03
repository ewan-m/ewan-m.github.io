import React from 'react';
import './App.css';
import SideMenu from './Pages/SideMenu';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from './Pages/Search';
import About from './Pages/About';

function App() {
    return (
        <Router>
            <div className="App d-flex flex-row">
                <SideMenu />
                <div className="PageContainer w-100 p-3">
                    <Route path="/search" component={Search} />
                    <Route path="/about" component={About} />
                </div>
            </div>
        </Router>
    );
}

export default App;
