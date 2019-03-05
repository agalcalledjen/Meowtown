import React from 'react';
import PropTypes from 'prop-types';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const HomeContainer = ({ classes }) => {
  return <Home classes={classes} />;
};

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeContainer);
