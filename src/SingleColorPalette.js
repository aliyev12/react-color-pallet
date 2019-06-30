import React, { useState } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";

const SingleColorPalette = ({ palette, colorId, classes }) => {
  const [format, changeFormat] = useState("hex");
  let paletteName, emoji, id;
  if (palette && palette.paletteName) {
    paletteName = palette.paletteName;
  }
  if (palette && palette.emoji) {
    emoji = palette.emoji;
  }
  if (palette && palette.id) {
    id = palette.id;
  }

  // Return all shades of given color
  const gatherShades = (pal, colorToFilterBy) => {
    let shades = [];
    if (pal && pal.colors) {
      let allColors = pal.colors;
      for (let key in allColors) {
        shades = shades.concat(
          allColors[key].filter(col => col.id === colorToFilterBy)
        );
      }
      return shades.slice(1);
    }
    return [];
  };

  const _shades = gatherShades(palette, colorId);

  const colorBoxes = _shades.map(color => (
    <ColorBox
      key={color.id + "-" + color.name + String(Math.floor(Math.random() * 9))}
      name={color.name}
      background={color[format]}
      showLink={false}
      showingFullPalette={false}
    />
  ));

  if (paletteName && emoji && id) {
    return (
      <div className={classes.Palette}>
        <Navbar changeFormat={changeFormat} showingAllColors={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  } else {
    return null;
  }
};

export default withStyles(styles)(SingleColorPalette);
