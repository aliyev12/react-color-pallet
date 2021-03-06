import React, { useState, useEffect } from "react";
import clsx from "clsx";
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
import useStyles from "./styles/NewPaletteFormStyles";
import Page from "./Page";
import seedColors from "./seedColors";

const NewPaletteForm = ({ savePalette, history, palettes }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);

  useEffect(() => {
    if (palettes && palettes.length > 0 && palettes[0].colors) {
      setColors(palettes[0].colors);
    }
  }, [palettes]);

  const handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    savePalette(newPalette);
    history.push("/");
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const addRandomColor = () => {
    if (colors.length < variables.maxColors) {
      const allColors = palettes.map(p => p.colors).flat();
      let rand;
      let randomColor;
      let isDuplicateColor = true;
      let maxLoop = 0;
      while (isDuplicateColor && maxLoop < 1000) {
        rand = Math.floor(Math.random() * allColors.length);
        randomColor = allColors[rand];
        isDuplicateColor = colors.some(
          color => color.name === randomColor.name
        );
        maxLoop++;
      }
      setColors(oldColors => [...oldColors, randomColor]);
    }
  };

  const handleAddNewColor = newColor => {
    if (colors.length < variables.maxColors) {
      setColors([...colors, newColor]);
    }
  };

  const paletteIsFull = colors.length >= variables.maxColors;

  return (
    <Page>
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          setOpen={setOpen}
          palettes={palettes}
          handleSubmit={handleSubmit}
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
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setColors([])}
                className={classes.button}
              >
                Clear Palette Button
              </Button>
              <Button
                disabled={paletteIsFull}
                variant="contained"
                color="primary"
                onClick={addRandomColor}
                className={classes.button}
              >
                {paletteIsFull ? "Palette Full" : "Random Color"}
              </Button>
            </div>
            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              handleAddNewColor={handleAddNewColor}
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
            distance={20}
          />
        </main>
      </div>
    </Page>
  );
};

export default NewPaletteForm;
