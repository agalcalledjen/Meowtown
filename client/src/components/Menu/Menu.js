import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import UserAcct from '@material-ui/icons/MoreVert';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../../images/boomtown.svg';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import SignoutIcon from '@material-ui/icons/PowerSettingsNew';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';

import styles from './styles';

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null
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

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        {/*         <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={this.handleChange}
                aria-label="LoginSwitch"
              />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              {/* <MenuIcon /> */}
              <img src={logo} className="App-logo" alt="logo" width="40" />
            </IconButton>
            {/*  <Typography variant="h6" color="inherit" className={classes.grow}>
              Photos
            </Typography> */}
            <Button
              href="#text-buttons"
              // className={(classes.margin, classes.shareButton)}
              className={classes.shareButton}
            >
              <AddIcon className={classes.margin} />
              Share Something
            </Button>
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
                    onClick={this.handleClose}
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

export default withStyles(styles)(MenuAppBar);

/* const MenuAppBar = ({ classes }) => {
  return (
    <div>
      <p>
        This is the share page located at <code> /share</code> .{' '}
      </p>
    </div>
  );
};

export default MenuAppBar; */
