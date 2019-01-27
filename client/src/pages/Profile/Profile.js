import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import Gravatar from 'react-gravatar';
import Avatar from '@material-ui/core/Avatar';
import ItemsGrid from '../../components/ItemsGrid';

const Profile = ({ classes, user }) => {
  // const profile = user;
  // console.log(profile);
  // const showBio = {user.bio} || 'No bio provided.';
  return (
    <Fragment>
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container className={classes.userName} alignItems="center">
              <Avatar className={classes.avatar}>
                <Gravatar
                  email={user.email}
                  default="retro"
                  className={classes.gravatar}
                />
              </Avatar>
              <Typography component="h1" variant="display1">
                {user.fullname}
              </Typography>
            </Grid>
            {/* <Typography component="h2" variant="display1" gutterBottom>
              <Gravatar
                email={user.email}
                default="retro"
                className={classes.gravatar}
              />
              {user.fullname}
            </Typography> */}
            <Typography component="h2" variant="headline" gutterBottom>
              {/* <Typography variant="title" gutterBottom> */}
              <span>2</span> Items shared <span>0</span> Items borrowed
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user.bio}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography component="h2" variant="display1" gutterBottom>
          Shared Items
        </Typography>
        <ItemsGrid items={user.items} />
      </Grid>
    </Fragment>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
