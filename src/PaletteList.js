import React from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import styles from "./styles/PaletteListStyles";

const PaletteList = ({ palettes, classes, history, deletePalette }) => {
  const goToPalette = id => {
    history.push(`/palette/${id}`);
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes &&
            palettes.length > 0 &&
            palettes.map((palette, i) => (
              <MiniPalette
                {...palette}
                handleClick={() => goToPalette(palette.id)}
                handleDeletePalette={deletePalette}
                paletteId={palette.id}
                key={palette.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
