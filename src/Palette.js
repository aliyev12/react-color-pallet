import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";

const Palette = ({ palette: { colors, paletteName, emoji, id }, classes }) => {
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
    <div className={classes.Palette}>
      <Navbar
        level={level}
        setLevel={newLevel => setLevel(newLevel)}
        changeFormat={value => changeFormat(value)}
        showingAllColors
      />
      {/* Navbar goes here */}
      <div className={classes.colors}>
        {/* bunch of colors */}
        {colorBoxes}
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default withStyles(styles)(Palette);
