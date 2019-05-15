import React, {useState} from "react";
import { Select, MenuItem } from "@material-ui/core";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

const Navbar = ({ level, setLevel, changeFormat }) => {
    const [format, setFormat] = useState('hex');
    const handleChange = async e => {
        await setFormat(e.target.value);
        changeFormat(e.target.value);
    }

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
        </header>
      );
}



export default Navbar;
