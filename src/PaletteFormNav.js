import React, { useState } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import PaletteMetaForm from "./PaletteMetaForm";
import styles from "./styles/PaletteFormNavStyles";

const PaletteFormNav = ({ classes, open, setOpen, palettes, handleSubmit }) => {
  const [formShowing, setFormShowing] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to="/">
            <Button
              className={classes.goBackBtn}
              variant="contained"
              color="secondary"
            >
              Go Back
            </Button>
          </Link>
          <Button
            className={classes.saveBtn}
            variant="contained"
            color="primary"
            onClick={() => {
              setFormShowing(true);
            }}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          setFormShowing={setFormShowing}
        />
      )}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
