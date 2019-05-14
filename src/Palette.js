import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Palette = ({ colors }) => {
  const [level, setLevel] = useState(500);

  const colorBoxes = colors[level].map(color => (
    <ColorBox background={color.hex} name={color.name} />
  ));
  return (
    <div className="Palette">
      <Slider
        defaultValue={level}
        min={100}
        max={900}
        step={100}
        onAfterChange={newLevel => setLevel(newLevel)}
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
