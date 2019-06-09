import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";
import "./ColorBox.css";

const styles = {
  ColorBox: {
    width: `20%`,
    height: props => (props.showingFullPalette ? "25%" : "50%"),
    margin: `0 auto`,
    display: `inline-block`,
    position: `relative`,
    cursor: `pointer`,
    marginBottom: `-3.5px`,
    "&:hover button": {
      opacity: 1
    }
  },
  copyText: {
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? "black" : "white"
  },
  colorName: {
    color: props =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "black"
  },
  seeMore: {
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
    background: `rgba(255, 255, 255, 0.3)`,
    position: `absolute`,
    border: `none`,
    right: `0`,
    bottom: `0`,
    width: `60px`,
    height: `30px`,
    textAlign: `center`,
    lineHeight: `30px`,
    textTransform: `uppercase`
  },
  copyButton: {
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
    height: `30px`,
    width: `100px`,
    position: `absolute`,
    display: `inline-block`,
    top: `50%`,
    left: `50%`,
    marginLeft: `-50px`,
    marginTop: `-15px`,
    textAlign: `center`,
    outline: `none`,
    background: `rgba(255, 255, 255, 0.3)`,
    fontSize: `1rem`,
    lineHeight: `30px`,
    textTransform: `uppercase`,
    border: `none`,
    textDecoration: `none`,
    opacity: 0
  }
};

const ColorBox = ({
  name,
  background,
  moreUrl,
  showingFullPalette,
  classes
}) => {
  const [copied, setCopied] = useState(false);

  const changeCopyState = async () => {
    await setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={`copy-overlay ${copied && "show"}`}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link to={moreUrl} onClick={e => e.stopPropagation()}>
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default withStyles(styles)(ColorBox);
