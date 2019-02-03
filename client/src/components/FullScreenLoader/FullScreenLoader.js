import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';
import catIcon from '../../images/cat-load.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './styles';

const FullScreenLoader = ({ classes }) => {
  return (
    <Grid
      container
      className={classes.container}
      justify="center"
      alignItems="center"
    >
      <div className={classes.wrapper}>
        <img src={catIcon} alt="Cat Icon" width="40" />
        <CircularProgress size={68} className={classes.progress} />
      </div>
    </Grid>
  );
};

FullScreenLoader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenLoader);

// TODO: return an image of cat img spinning for the loading thing
