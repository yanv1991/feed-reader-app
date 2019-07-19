import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AddFeed from "./components/AddFeed";
import Message from "./components/Message";
import FeedList from "./components/FeedList";

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
    margin: theme.spacing(1)
  },
  truncate: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  mainContainer: {
    marginTop: "5rem",
    "& div:nth-child(3)": {
      overflow: "hidden"
    }
  }
}));

export default function SimpleContainer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Grid container spacing={3} className={classes.mainContainer}>
          <AddFeed />
          <FeedList />
          <Message />
        </Grid>
      </Container>
    </React.Fragment>
  );
}
