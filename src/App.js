import React from 'react';
import './App.css';
import { TopMenu } from './Pages/TopMenu';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from './Pages/Search';
import About from './Pages/About';

function App() {
    return (
        <Router>
            <div className="App d-flex flex-column">
                <TopMenu />
                <div className="PageContainer w-100 p-3">
                    <Route path="/search" component={Search} />
                    <Route path="/about" component={About} />
                </div>
            </div>
        </Router>
    );
}

export default App;
