import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const Profile = ({ classes, user }) => {
  // const profile = user;
  // console.log(profile);
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component="h2" variant="display1" gutterBottom>
              {user.fullname}
            </Typography>
            <Typography component="h2" variant="headline" gutterBottom>
              {/* <Typography variant="title" gutterBottom> */}
              <span>2</span> Items shared <span>0</span> Items borrowed
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user.bio} "No bio provided."
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
