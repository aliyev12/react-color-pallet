import React from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
        <TransitionGroup className={classes.palettes}>
          {palettes &&
            palettes.length > 0 &&
            palettes.map((palette, i) => (
              <CSSTransition key={palette.id} classNames="fade" timeout={300}>
                <MiniPalette
                  {...palette}
                  handleClick={() => goToPalette(palette.id)}
                  handleDeletePalette={deletePalette}
                  paletteId={palette.id}
                  key={palette.id}
                />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
