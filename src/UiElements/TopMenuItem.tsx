import React from 'react';
import './TopMenuItem.css';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

export function TopMenuItem(props: {icon: IconType, name: string}) {
    const Icon = props.icon;
    const Destination = '/' + props.name.replace(' ', '');

    return (
        <NavLink to={Destination} className="MenuItem" activeClassName="Selected">
            <Icon />
            {props.name}
        </NavLink>
    );
}
