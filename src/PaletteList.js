import React, { useState } from "react";
import MiniPalette from "./MiniPalette";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./styles/PaletteListStyles";
import Page from "./Page";

const PaletteList = ({ palettes, classes, history, deletePalette }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const goToPalette = id => {
    history.push(`/palette/${id}`);
  };

  const handleOpenDialog = id => {
    setOpenDeleteDialog(true);
    setDeletingId(id);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
    setDeletingId("");
  };

  const handleDelete = () => {
    deletePalette(deletingId);
    setOpenDeleteDialog(false);
  };

  const handleCancel = () => {
    setOpenDeleteDialog(false);
    setDeletingId("");
  };
  return (
    <Page>
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes &&
              palettes.length > 0 &&
              palettes.map((palette, i) => (
                <CSSTransition key={palette.id} classNames="fade" timeout={300}>
                  <MiniPalette
                    {...palette}
                    handleClick={goToPalette}
                    openDialog={handleOpenDialog}
                    paletteId={palette.id}
                    key={palette.id}
                  />
                </CSSTransition>
              ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={handleClose}
        >
          <DialogTitle id="delete-dialog-title">
            Delete this palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={handleDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem button onClick={handleCancel}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    </Page>
  );
};

export default withStyles(styles)(PaletteList);
