import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import DraggableColorList from "./DraggableColorList";
import arrayMove from "array-move";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import variables from "./variables";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: variables.drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: variables.drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - 64px)`,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -variables.drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {}
}));

const NewPaletteForm = ({ savePalette, history, palettes, maxColors }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("teal");
  const [colors, setColors] = useState(palettes[0].colors);
  const [newColorName, setnewColorName] = useState("");

  const handleSubmit = newPaletteName => {
    savePalette({
      paletteName: newPaletteName,
      id: newColorName.toLowerCase().replace(/ /g, "-"),
      colors
    });
    history.push("/");
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const addRandomColor = () => {
    if (colors.length < maxColors) {
      const allColors = palettes.map(p => p.colors).flat();
      let randomColor;
      let check = true;
      let maxLoop = 0;
      while (check) {
        var rand = Math.floor(Math.random() * allColors.length);
        var exists =
          colors.map(c => c.color).indexOf(allColors[rand].color) !== -1;
        if (!exists) {
          randomColor = allColors[rand];
          check = false;
        }
        if (maxLoop >= 1000) {
          check = true;
        }
        maxLoop = maxLoop + 1;
      }

      setColors(oldColors => [...oldColors, randomColor]);
    }
  };

  const handleCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };

  const handleAddNewColor = newColorName => {
    if (colors.length < maxColors) {
      setColors([
        ...colors,
        {
          color: currentColor,
          name: newColorName
        }
      ]);
    }
    setnewColorName("");
  };

  const handleNewColorName = e => {
    setnewColorName(e.target.value);
  };

  const paletteIsFull = colors.length >= maxColors;

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        setOpen={setOpen}
        classes={classes}
        maxColors={maxColors}
        palettes={palettes}
        handleSubmit={handleSubmit}
        colors={colors}
        setColors={setColors}
        newColorName={newColorName}
        setnewColorName={setnewColorName}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4">Design Your Palette</Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setColors([])}
            >
              Clear Palette Button
            </Button>
            <Button
              disabled={paletteIsFull}
              variant="contained"
              color="primary"
              onClick={addRandomColor}
            >
              {paletteIsFull ? "Palette Full" : "Random Color"}
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            handleCurrentColor={handleCurrentColor}
            handleAddNewColor={handleAddNewColor}
            handleNewColorName={handleNewColorName}
            newColorName={newColorName}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          axis="xy"
          removeColor={colorName => {
            setColors(colors.filter(col => col.name !== colorName));
          }}
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
};

NewPaletteForm.defaultProps = {
  maxColors: 20
};

export default NewPaletteForm;
