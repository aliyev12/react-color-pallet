import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const PaletteMetaForm = ({ palettes, handleSubmit, setFormShowing }) => {
  const [newPaletteName, setNewPaletteName] = useState("");
  const [stage, setStage] = useState("form");

  useEffect(() => {
    // Validate palette name unique
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });

  const savePalette = ({ native }) => {
    handleSubmit({
      paletteName: newPaletteName,
      emoji: native
    });
  };

  return (
    <div>
      <Dialog
        open={stage === "emoji"}
        onClose={() => {
          setFormShowing(false);
        }}
      >
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <Picker title="Pick a Palette Emoji" onSelect={savePalette} />
        <DialogActions>
          <Button
            onClick={() => {
              setFormShowing(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={stage === "form"}
        onClose={() => {
          setFormShowing(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => setStage("emoji")}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it
              is unique.
            </DialogContentText>
            <TextValidator
              level="Palette Name"
              onChange={e => setNewPaletteName(e.target.value)}
              value={newPaletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setFormShowing(false);
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PaletteMetaForm;
