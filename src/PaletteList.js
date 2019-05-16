import React from "react";
import MiniPalette from './MiniPalette';
import { Link } from "react-router-dom";

const PaletteList = ({ palettes }) => {
  return (
    <>
    <MiniPalette />
      <h1>React Colors</h1>
      {palettes.map(palette => (
          <MiniPalette {...palette} />
        // <p>
        //   <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        // </p>
      ))}
    </>
  );
};

export default PaletteList;
