import React, { Fragment } from 'react';
import ItemsGrid from '../../components/ItemsGrid';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Items = ({ classes, items }) => {
  // const { items } = data;
  return (
    <div className={classes.container}>
      <ItemsGrid items={items} />
    </div>
  );
};

export default withStyles(styles)(Items);
