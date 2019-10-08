import React from 'react';
import './GlobalStyles/GlobalStyles';
import './App.css';
import { TopMenu } from './Pages/TopMenu';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Search } from './Pages/Search';
import { About } from './Pages/About';
import { Favourites } from './Pages/Favourites';
import { ArticleDetailsModal } from './UiElements/ArticleDetailsModal';

export function App(): React.ReactElement {
    return (
        <Router>
            <div className="app">
                <TopMenu />
                <div className="page-container">
                    <Route path="/search" component={Search} />
                    <Route path="/about" component={About} />
                    <Route path="/favourites" component={Favourites} />
                    <Route path="/modal" component={ArticleDetailsModal} />
                </div>
            </div>
        </Router>
    );
}
