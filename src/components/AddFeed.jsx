import React, { Fragment, useState, useCallback } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

import { createFeed } from "../actions";
import { isValidURL } from "../helpers";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing(1),
    minHeight: "3.5rem"
  },
  truncate: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  item: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex", width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column'
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export const AddFeed = React.memo(({ onCreateFeed, isAddingItem }) => {
  const classes = useStyles();
  const [url, setUrl] = useState("");

  const onChangeUrl = useCallback(e => {
    setUrl(e.target.value);
  }, []);

  const onSubmitUrl = useCallback((e) => {
    e.preventDefault();

    if (isValidURL(url)) {
      onCreateFeed(url);
      setUrl("");
    }
  }, [url]);

  return (
    <Fragment>
      <form className={classes.form} noValidate>
        <Grid item xs={11} sm={10} md={4} className={classes.item}>
          <TextField
            id="filled-full-width"
            inputProps={{ "data-testid": "urlFeed" }}
            style={{ margin: 8 }}
            placeholder="https://blog.safia.rocks/rss"
            fullWidth
            margin="normal"
            variant="filled"
            InputLabelProps={{
              shrink: true
            }}
            value={url}
            onChange={onChangeUrl}
          />
        </Grid>
        <Grid item xs={11} sm={10} md={4} className={classes.item}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onSubmitUrl}
            data-testid="sendButton"
          >
            Add feed
          </Button>
        </Grid>
        {
          isAddingItem && <Grid item xs={11} sm={10} md={2} className={`${classes.item} ${classes.loading}`}>
          <CircularProgress disableShrink />
          </Grid>
        }
      </form>
    </Fragment>
  );
});

export default connect(
  ({ isAddingItem }) => ({ isAddingItem }),
  { onCreateFeed: createFeed }
)(AddFeed);
