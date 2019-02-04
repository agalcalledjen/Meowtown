import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ItemCard from '../ItemCard/ItemCard';
import styles from './styles';

const ItemsGrid = ({ classes, items }) => {
  return (
    <Grid
      container
      className={classes.itemsRoot}
      spacing={24}
      justify="flex-start"
    >
      {items.map(item => (
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          className={classes.control}
          key={item.id}
        >
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
