import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const DeleteFeed = React.memo(({ idx, id, onDeleteFeed }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleYes() {
    onDeleteFeed(id)
    setOpen(false)
  }

  return (
    <Fragment>
      <IconButton aria-label="delete" className={classes.margin} onClick={handleClickOpen}>
        <DeleteIcon fontSize="large" data-testid={`delete-${idx}`} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete feed"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" data-testid="confirmation-message">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} color="primary" data-testid="yes-button">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
});

export default DeleteFeed
