import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { compose } from 'redux'

import { hideClose } from '../actions'

const styles = theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  success: {
    backgroundColor: green[600],
  },
});

class Message extends React.Component {
  queue = [];

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    this.props.onHideClose()
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { classes, showSuccess } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          className={classes.success}
          open={showSuccess}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'client-snackbar',
            classes: { root: classes.success }
          }}
          message={<span id="message-id">{"Item added successfully"}</span>}
          action={[,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default compose(
  connect(({ showSuccess }) => ({ showSuccess }), { onHideClose: hideClose }),
  withStyles(styles)
)(Message)