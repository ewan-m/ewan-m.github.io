import React from 'react';
import './Loading.css';

export function Loading() {
    const elements: Array<React.CSSProperties> = [];
    const elementsToRender = Math.min(Math.round(window.innerWidth / 20), 20);

    for (let i = 0; i < elementsToRender; i++) {
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