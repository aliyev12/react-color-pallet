import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

const Palette = ({ palette: { colors } }) => {
  const [level, setLevel] = useState(500);
  const [format, changeFormat] = useState('hex');

  const colorBoxes = colors[level].map(color => (
    <ColorBox background={color[format]} name={color.name} />
  ));
  return (
    <div className="Palette">
      <Navbar
        level={level}
        setLevel={newLevel => setLevel(newLevel)}
        changeFormat={value => changeFormat(value)}
      />
      {/* Navbar goes here */}
      <div className="Palette-colors">
        {/* bunch of colors */}
        {colorBoxes}
      </div>
      {/* footer */}
    </div>
  );
};

export default Palette;
