import React, { useEffect } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem"
  }
};

const ColorPickerForm = ({
  paletteIsFull,
  currentColor,
  handleAddNewColor,
  handleCurrentColor,
  handleNewColorName,
  newColorName,
  colors,
  classes
}) => {
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
        onChangeComplete={handleCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={() => handleAddNewColor(newColorName)}>
        <TextValidator
          value={newColorName}
          onChange={handleNewColorName}
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
