import React from 'react';
import ItemsGrid from '../../components/ItemsGrid';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Items = ({ classes, items }) => {
  return (
    <div className={classes.container}>
      <ItemsGrid items={items} />
    </div>
  );
};

export default withStyles(styles)(Items);
