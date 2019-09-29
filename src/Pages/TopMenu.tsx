import React from 'react';
import './TopMenu.css';
import {
    FaInfoCircle,
    FaSearch,
    FaUser,
    FaHeart
} from 'react-icons/fa';
import { TopMenuItem } from '../UiElements/TopMenuItem';

export function TopMenu() {
    return (
        <header className="site-header d-flex flex-row justify-content-between py-1 px-3 px-md-5">
            <h1 className="title">
                <span className="first-word">
                    arX
                    </span>
                <span className="second-word">
                    plorer
                    </span>
            </h1>
            <div className="d-flex flex-row align-items-center">
                <TopMenuItem name="search" icon={FaSearch} />
                <TopMenuItem name="favourites" icon={FaHeart} />
                <TopMenuItem name="about" icon={FaInfoCircle} />
            </div>
            <div className="d-flex align-items-center">
                <button className="btn btn-primary SignUp">
                    <FaUser /><span className="d-none d-sm-inline ml-1">account</span>
                </button>
            </div>
        </header>
    );
}
