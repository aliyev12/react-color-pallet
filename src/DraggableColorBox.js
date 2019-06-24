import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
import styles from "./styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement(
  ({ color, name, handleClick, classes: { root, boxContent, deleteIcon } }) => (
    <div className={root} style={{ backgroundColor: color }}>
      <div className={boxContent}>
        <span>{name}</span>
        <DeleteIcon className={deleteIcon} onClick={handleClick} />
      </div>
    </div>
  )
);
export default withStyles(styles)(DraggableColorBox);
