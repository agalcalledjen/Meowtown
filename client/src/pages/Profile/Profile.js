import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import Gravatar from 'react-gravatar';
import Avatar from '@material-ui/core/Avatar';
import ItemsGrid from '../../components/ItemsGrid';

const Profile = ({ classes, user }) => {
  const sharedItems = user.items.length;

  return (
    <div className={classes.container}>
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
            <Typography component="h2" variant="headline" gutterBottom>
              {sharedItems > 1 || sharedItems === 0
                ? sharedItems + ' Items '
                : sharedItems + ' Item '}
              shared 0 Items borrowed
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user.bio}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {sharedItems ? (
        <Grid item xs={12} className={classes.shareWrapper}>
          <Typography
            component="h2"
            variant="display1"
            gutterBottom
            className={classes.share}
            color="primary"
          >
            Shared Items
          </Typography>
          <ItemsGrid items={user.items} />
        </Grid>
      ) : (
        ''
      )}
    </div>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    bio: PropTypes.string.isRequired,
    borrowed: PropTypes.array.isRequired,
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  })
};

export default withStyles(styles)(Profile);
