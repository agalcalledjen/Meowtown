import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountForm from '../../components/AccountForm';

const Home = ({ classes }) => {
  return (
    <Grid
      container
      className={classes.container}
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} sm={12} md={6} className={classes.heading}>
        <Typography
          variant="button"
          gutterBottom
          className={classes.subheading}
        >
          Meowtown
        </Typography>
        <Typography variant="display4" className={classes.headline}>
          Share. Borrow. Blep.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} className={classes.account}>
        <Typography gutterBottom variant="headline">
          Welcome home.
        </Typography>
        <AccountForm />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;
