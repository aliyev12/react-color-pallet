import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles.js";
import DeleteIcon from "@material-ui/icons/Delete";

const MiniPalette = ({
  classes,
  paletteName,
  emoji,
  colors,
  handleClick,
  openDialog,
  paletteId
}) => (
  <div className={classes.root} onClick={handleClick}>
    <DeleteIcon
      className={classes.deleteIcon}
      style={{ transition: "all 0.3s ease-in-out" }}
      onClick={e => {
        e.stopPropagation();
        openDialog(paletteId);
      }}
    />
    <div className={classes.colors}>
      {/*MINI COLOR BOXES*/}
      {colors.map(color => (
        <div
          className={classes.miniColor}
          style={{ backgroundColor: color.color }}
          key={color.name}
        />
      ))}
    </div>
    <h5 className={classes.title}>
      {paletteName} <span className={classes.emoji}>{emoji}</span>
    </h5>
  </div>
);

export default withStyles(styles)(MiniPalette);
