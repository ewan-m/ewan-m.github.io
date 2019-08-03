import React from 'react';
import './SideMenu.css';
import {
    FaInfoCircle,
    FaRegCopyright,
    FaSearch
} from 'react-icons/fa';
import MenuItem from '../UiElements/MenuItem';

function SideMenu() {
    return (
        <div className="d-flex flex-column justify-content-between Container">
            <div>
                <header className="pt-3">
                    <h1 className="Title">
                        <span className="FirstWord">
                            arX
                    </span>
                        <span className="SecondWord">
                            plorer
                    </span>
                    </h1>
                </header>
                <div>
                    <div className="DividingLabel">
                        <span>
                            explore
                        </span>
                    </div>
                    <MenuItem name='Search' icon={FaSearch} />
                    <div className="DividingLabel">
                        <span>miscellaneous</span>
                    </div>
                    <MenuItem name='About' icon={FaInfoCircle} />
                </div>
            </div>
            <footer className="text-muted p-2 small" style={{ textAlign: 'right' }}>
                <FaRegCopyright /> Ewan Morrison {new Date().getFullYear()}
            </footer>
        </div>
    );
}

export default SideMenu;
