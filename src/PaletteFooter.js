import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteFooter";

const PaletteFooter = ({ paletteName, emoji, classes }) => (
  <footer className={classes.PaletteFooter}>
    {paletteName}
    <span className={classes.emoji}>{emoji}</span>
  </footer>
);

export default withStyles(styles)(PaletteFooter);
