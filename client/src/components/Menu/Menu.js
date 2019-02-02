import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import UserAcct from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../../images/boomtown.svg';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import SignoutIcon from '@material-ui/icons/PowerSettingsNew';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import { Link, withRouter } from 'react-router-dom';

import {
  LOGOUT_MUTATION,
  VIEWER_QUERY // this asks for the cookie
} from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import Slide from '@material-ui/core/Slide';

import styles from './styles';

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    shareBtn: true
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  shareHandleChange = () => {
    this.setState(state => ({ shareBtn: !state.shareBtn }));
  };

  render() {
    const { classes, history } = this.props;
    const { shareBtn } = this.state;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    // console.log(history);

    // const sharePgBg =
    //   location.pathname === '/share'
    //     ? { background: 'white' }
    //     : { background: '#212121' };

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              href="/welcome"
            >
              {/* <MenuIcon /> */}
              <img src={logo} className="App-logo" alt="logo" width="40" />
            </IconButton>
            <div className={classes.grow} />
            {/* {history.location.pathname === '/share' ? (
              <Fragment />
            ) : (
              <Button href="/share" className={classes.shareButton}>
                <AddIcon className={classes.margin} />
                SHARE SOMETHING
              </Button>
            )} */}
            {history.location.pathname === '/share' ? (
              <Fragment />
            ) : (
              <Slide direction="left" in={shareBtn} mountOnEnter unmountOnExit>
                <Button
                  href="/share"
                  className={classes.shareButton}
                  // onClick={() => {
                  //   return false;
                  // }}
                >
                  <AddIcon className={classes.margin} />
                  SHARE SOMETHING
                </Button>
              </Slide>
            )}

            {/* <Button href="/share" className={classes.shareButton}>
              <AddIcon className={classes.margin} />
              SHARE SOMETHING
            </Button> */}
            {auth && (
              <div>
                <IconButton
                  className={classes.userButton}
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <UserAcct />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem
                    className={classes.menuItem}
                    onClick={this.handleClose}
                    component={Link}
                    to="/profile"
                  >
                    <ListItemIcon className={classes.icon}>
                      <FingerprintIcon />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.primary }}
                      inset
                      primary="Your Profile"
                    />
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    // onClick={this.handleClose}
                    onClick={this.props.logoutMutation}
                    component={Link}
                    to="/welcome"
                  >
                    <ListItemIcon className={classes.icon}>
                      <SignoutIcon />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.primary }}
                      inset
                      primary="Sign Out"
                    />
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(MenuAppBar);

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default withRouter(
  compose(
    graphql(LOGOUT_MUTATION, {
      options: {
        refetchQueries
      },
      name: 'logoutMutation'
    }),
    withStyles(styles)
  )(MenuAppBar)
);
