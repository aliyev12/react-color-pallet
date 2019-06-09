import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./Palette.css";

const Palette = ({ palette: { colors, paletteName, emoji, id } }) => {
  const [level, setLevel] = useState(500);
  const [format, changeFormat] = useState("hex");

  const colorBoxes = colors[level].map(color => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      id={color.id}
      paletteId={id}
      moreUrl={`/palette/${id}/${color.id}`}
      showingFullPalette
    />
  ));
  return (
    <div className="Palette">
      <Navbar
        level={level}
        setLevel={newLevel => setLevel(newLevel)}
        changeFormat={value => changeFormat(value)}
        showingAllColors
      />
      {/* Navbar goes here */}
      <div className="Palette-colors">
        {/* bunch of colors */}
        {colorBoxes}
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default Palette;
