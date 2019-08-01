import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { green, red } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { compose } from "redux";

import { hideClose } from "../actions";

const styles = theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: red[600]
  }
});

class Message extends React.Component {
  queue = [];

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      });
    }
  };

  handleClose = (event, reason) => {
    this.props.onHideClose();
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { classes, showMessage, hasError } = this.props;
    const msg = hasError ? "something went wrong" : "Action executed successfully";

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={showMessage}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            "aria-describedby": "client-snackbar",
            classes: { root: hasError ? classes.error : classes.success }
          }}
          message={<span id="message-id">{msg}</span>}
          action={[
            ,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export default compose(
  connect(
    ({ showSuccess: showMessage, hasError }) => ({ showMessage, hasError }),
    { onHideClose: hideClose }
  ),
  withStyles(styles)
)(Message);
