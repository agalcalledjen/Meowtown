import React from 'react';
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';
import catIcon from '../../images/cat-load.png';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';

const FullScreenLoader = ({ classes }) => {
  return (
    <Grid
      container
      className={classes.container}
      justify="center"
      alignItems="center"
    >
      <Grid item className={classes.wrapper}>
        <img src={catIcon} alt="Cat Icon" width="80" />
        <CircularProgress size={120} className={classes.progress} />
        <Typography
          component="h2"
          variant="headline"
          className={classes.catQuote}
          color="primary"
        >
          “You can not look at a sleeping cat and feel tense.” – Jane Pauley
        </Typography>
      </Grid>
      {/* <Grid item /> */}
    </Grid>
  );
};

FullScreenLoader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenLoader);

// TODO: return an image of cat img spinning for the loading thing
