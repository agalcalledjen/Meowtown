import React from 'react';
import PropTypes from 'prop-types';
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

Items.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(Items);
