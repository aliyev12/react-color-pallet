import React from "react";
import { Link } from "react-router-dom";

const PaletteList = ({ palettes }) => {
  return (
    <>
      <h1>React Colors</h1>
      {palettes.map(palette => (
        <p>
          <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        </p>
      ))}
    </>
  );
};

export default PaletteList;
