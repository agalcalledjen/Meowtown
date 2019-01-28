import React from 'react';
import Grid from '@material-ui/core/Grid';
// import PropTypes from 'prop-types';

/* 
  TODO: Create ShareItemForm and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 
  and upload an image.

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

const Share = ({ classes, tags }) => {
  return (
    <Grid container className={classes.root} spacing={24}>
      <Grid item xs={6} className={classes.control}>
        <ShareItemPreview />
      </Grid>
      <Grid item xs={6} className={classes.control}>
        <ShareItemForm tags={tags} />
      </Grid>
    </Grid>
  );
};

export default Share;
