import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

const Share = ({ classes, tags }) => {
  console.log(tags);
  return (
    <Grid container className={classes.container} spacing={40} justify="center">
      <Grid item sm={6} md={4} className={classes.control}>
        <Hidden only="xs">
          <ShareItemPreview />
        </Hidden>
      </Grid>
      <Grid item xs={12} sm={6} md={4} className={classes.control}>
        <ShareItemForm tags={tags} />
      </Grid>
    </Grid>
  );
};

Share.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default Share;
