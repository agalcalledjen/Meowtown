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

// const ItemCount = ({ sharedItems }) => {
//   return (
//     <span>
//       {sharedItems}
//       {sharedItems > 1 ? ' Items' : ' Item'}
//     </span>
//   );
// };

// ItemCount.defaultProps = {
//   sharedItems: 0
// };

// ItemCount.propTypes = {
//   sharedItems: PropTypes.number.isRequired
// };

const Profile = ({ classes, user }) => {
  // const profile = user;
  // console.log(profile);
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
              <span>
                {sharedItems > 1 || sharedItems === 0
                  ? sharedItems + ' Items'
                  : sharedItems + ' Item'}
              </span>{' '}
              shared <span>0</span> Items borrowed
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user.bio}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {sharedItems ? (
        <Grid item xs={12}>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
