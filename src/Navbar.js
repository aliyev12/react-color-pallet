import React, { useState } from "react";
import { Select, MenuItem, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

const Navbar = ({ level, setLevel, changeFormat }) => {
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    
  }

  const handleChange = async e => {
    await setFormat(e.target.value);
    await setOpen(true);
    changeFormat(e.target.value);
  };

  return (
    <header className="Navbar">
      <div className="logo">
        <a href="#">reactcolorpicker</a>
      </div>
      <div className="slider-container">
        <span>Level: {level}</span>
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={setLevel}
          />
        </div>
      </div>
      <div className="select-container">
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
        message={<span id="message-id">Format Changed to {format.toUpperCase()}!</span>}
        ContentProps={{
          "aria-describeby": "message-id"
        }}
        // onClose={handleClose}
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

export default Navbar;
