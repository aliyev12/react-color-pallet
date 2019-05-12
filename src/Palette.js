import React from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

const Palette = props => {
    const colorBoxes = props.colors.map(color => (
        <ColorBox background={color.color} name={color.name} />
    ));
    return (
        <div className="Palette">
            {/* Navbar goes here */}
            <div className="Palette-colors">
            {/* bunch of colors */}
            {colorBoxes}
            </div>
            {/* footer */}
        </div>
    )
}

export default Palette;