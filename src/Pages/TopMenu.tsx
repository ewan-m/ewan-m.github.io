import React from 'react';
import './TopMenu.css';
import {
    FaInfoCircle,
    FaSearch,
    FaHeart
} from 'react-icons/fa';
import { TopMenuItem } from '../UiElements/TopMenuItem';

export const TopMenu = () => {
    return (
        <header className="site-header">
            <h1 className="title">
                <span className="first-word">
                    arX
                </span>
                <span className="second-word">
                    plorer
                </span>
            </h1>
            <div className="buttons-section">
                <TopMenuItem name="search" icon={FaSearch} />
                <TopMenuItem name="favourites" icon={FaHeart} />
                <TopMenuItem name="about" icon={FaInfoCircle} />
            </div>
        </header>
    );
}
