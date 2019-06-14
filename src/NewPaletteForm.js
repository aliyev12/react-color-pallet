import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import DraggableColorList from "./DraggableColorList";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import arrayMove from "array-move";
import PaletteFormNav from "./PaletteFormNav";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
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
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const NewPaletteForm = ({ savePalette, history, palettes, maxColors }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("teal");
  const [colors, setColors] = useState(palettes[0].colors);
  const [newColorName, setnewColorName] = useState("");

  useEffect(() => {
    // Validate name unique
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    // Validate color unique
    ValidatorForm.addValidationRule("isColorUnique", () =>
      colors.every(({ color }) => color.toLowerCase() !== currentColor)
    );
  });

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

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        setOpen={setOpen}
        classes={classes}
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
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setColors([])}
          >
            Clear Palette Button
          </Button>
          <Button
            disabled={colors.length >= maxColors}
            variant="contained"
            color="primary"
            onClick={addRandomColor}
          >
            {colors.length >= maxColors ? "Palette Full" : "Random Color"}
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => setCurrentColor(newColor.hex)}
        />
        <ValidatorForm
          onSubmit={e => {
            if (colors.length < maxColors) {
              setColors([
                ...colors,
                {
                  color: currentColor,
                  name: newColorName
                }
              ]);
              //setnewColorName("");
            }
          }}
        >
          <TextValidator
            value={newColorName}
            onChange={e => setnewColorName(e.target.value)}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a color name",
              "Color name must be unique",
              "Color already used!"
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            style={{ backgroundColor: currentColor }}
            disabled={colors.length >= maxColors}
          >
            {colors.length >= maxColors ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
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
