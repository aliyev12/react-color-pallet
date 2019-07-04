import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles";

const ColorPickerForm = ({
  paletteIsFull,
  handleAddNewColor,
  colors,
  classes
}) => {
  const [currentColor, setCurrentColor] = useState("teal");
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

  return (
    <>
      <ChromePicker
        color={currentColor}
        onChangeComplete={newColor => {
          setCurrentColor(newColor.hex);
        }}
        className={classes.picker}
      />
      <ValidatorForm
        onSubmit={() =>
          handleAddNewColor({
            color: currentColor,
            name: newColorName
          })
        }
        instantValidate={false}
      >
        <TextValidator
          value={newColorName}
          className={classes.colorNameInput}
          variant="filled"
          margin="normal"
          onChange={e => {
            setnewColorName(e.target.value);
          }}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name",
            "Color name must be unique",
            "Color already used!"
          ]}
          placeholder="Color Name"
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={{ backgroundColor: currentColor }}
          disabled={paletteIsFull}
          className={classes.addColor}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </>
  );
};

export default withStyles(styles)(ColorPickerForm);
