import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ItemCard from '../ItemCard/ItemCard';
import styles from './styles';

const ItemsGrid = ({ classes, items }) => {
  return (
    <Grid container className={classes.root} spacing={24}>
      {items.map(item => (
        <Grid className={classes.control} item xs={4} key={item.id}>
          <ItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemsGrid);
