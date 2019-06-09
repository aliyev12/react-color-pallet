import React, { useState } from "react";
import { Select, MenuItem, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Slider from "rc-slider";

import styles from "./styles/NavbarStyles";
import "rc-slider/assets/index.css";

const Navbar = ({
  level,
  setLevel,
  changeFormat,
  showingAllColors,
  classes: { Navbar, logo, slider, selectContainer }
}) => {
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  const handleChange = async e => {
    await setFormat(e.target.value);
    await setOpen(true);
    console.log("changeFormat => ", changeFormat);
    changeFormat(e.target.value);
  };

  return (
    <header className={Navbar}>
      <div className={logo}>
        <Link to="/">reactcolorpicker</Link>
      </div>
      {showingAllColors && (
        <div>
          <span>Level: {level}</span>
          <div className={slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={setLevel}
            />
          </div>
        </div>
      )}
      <div className={selectContainer}>
        <Select value={format} onChange={handleChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={300}
        message={
          <span id="message-id">Format Changed to {format.toUpperCase()}!</span>
        }
        ContentProps={{
          "aria-describeby": "message-id"
        }}
        action={[
          <IconButton
            onClick={() => setOpen(false)}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </header>
  );
};

export default withStyles(styles)(Navbar);
