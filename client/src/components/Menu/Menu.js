import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
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
import { Link } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

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
              href="/welcome"
            >
              {/* <MenuIcon /> */}
              <img src={logo} className="App-logo" alt="logo" width="40" />
            </IconButton>
            <div className={classes.grow} />
            <Button
              href="/share"
              // className={(classes.margin, classes.shareButton)}
              className={classes.shareButton}
            >
              <AddIcon className={classes.margin} />
              SHARE SOMETHING
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
                  {/* <ApolloConsumer>
                    {client => ( */}
                  <MenuItem
                    className={classes.menuItem}
                    onClick={this.handleClose}
                    // onClick={() => {
                    //   // client.writeData({ data: { isLoggedIn: false } });
                    //   client.writeData({ data: { isLoggedIn: false } });
                    //   localStorage.clear();
                    // }}
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
                  {/* )}
                  </ApolloConsumer> */}
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
