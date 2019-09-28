import React from 'react';
import './Loading.css';

export function Loading() {
    const elements: Array<React.CSSProperties> = [];

    for (let i = 0; i < 20; i++) {
        elements.push({ "--animation-order": i } as React.CSSProperties);
    }

    return (
        <div className="dna-helix">
            {
                elements.map((element, index) => {
                    return <div className="node" key={index} style={element}></div>
                })
            }
        </div>
    )
}