import React from 'react';
import './MenuItem.css';
import { NavLink } from "react-router-dom";

function MenuItem(props) {
    const Icon = props.icon;
    const Destination = '/' + props.name.replace(' ', '');

    return (
        <NavLink to={Destination} className="MenuItem" activeClassName="Selected">
            <Icon />
            {props.name}
        </NavLink>
    );
}

export default MenuItem;

