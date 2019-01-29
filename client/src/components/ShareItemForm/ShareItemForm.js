import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Form, Field } from 'react-final-form';
import {
  updateItem,
  resetItem,
  resetItemImg
} from '../../redux/modules/ShareItem';
import { connect } from 'react-redux';

// import { validate } from './helpers/validation';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  handleChange = event => {
    this.setState({ checked: event.target.value });
  };

  onSubmit(input) {
    console.log('Submitting:', input);
  }

  validate(o) {
    console.log('Validating:', o);
    const error = {};
    if (!o.title) {
      error.title = 'Title is required.';
    }
    if (!o.description) {
      error.description = 'Description is required.';
    }
    if (!o.tag) {
      error.tag = 'At least one tag is required.';
    }
    return error;
  }

  render() {
    const { classes, tags } = this.props;
    return (
      <Fragment>
        <Typography variant="display1" className={classes.headline}>
          Share. Borrow.
        </Typography>
        <Typography variant="display1" className={classes.headline}>
          Prosper.
        </Typography>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({
            handleSubmit
            // , submitting, pristine
          }) => (
            <form className={classes.container} onSubmit={handleSubmit}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Select An Image
              </Button>
              <Field
                name="name"
                render={({ input, meta }) => (
                  <FormControl className={classes.field}>
                    <InputLabel
                      // htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel
                        // focused: classes.cssFocused
                      }}
                    >
                      Name your item
                    </InputLabel>
                    <Input
                      id="item-name-input"
                      className={classes.input}
                      classes={{
                        underline: classes.cssUnderline
                      }}
                    />
                    {meta.touched &&
                      meta.invalid && (
                        <div
                          className={classes.error}
                          // style={{
                          //   color: 'red',
                          //   fontSize: '0.8rem',
                          //   margin: '1rem'
                          // }}
                        >
                          {meta.error}
                        </div>
                      )}
                  </FormControl>
                )}
              />
              <Field
                name="description"
                render={({ input, meta }) => (
                  <FormControl className={classes.field}>
                    <Input
                      id="item-description-input"
                      className={classes.input}
                      multiline
                      rows="4"
                      defaultValue="Description"
                      // margin="normal"
                    />
                    {meta.touched &&
                      meta.invalid && (
                        <div
                          className={classes.error}
                          // style={{
                          //   color: 'red',
                          //   fontSize: '0.8rem',
                          //   margin: '1rem'
                          // }}
                        >
                          {meta.error}
                        </div>
                      )}
                  </FormControl>
                )}
              />

              <FormControl className={classes.field}>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Add some tags
                </InputLabel>
                <Select
                  multiple
                  value={this.state.checked}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  className={classes.tags}
                >
                  {tags.map(tag => (
                    <MenuItem key={tag.id} value={tag.title}>
                      <Checkbox
                        checked={this.state.checked.indexOf(tag.title) > -1}
                      />
                      <ListItemText primary={tag.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                // color="primary"
                // disabled
                className={classes.shareButton}
                // disabled={submitting || pristine}
                type="submit"
              >
                Share
              </Button>
            </form>
          )}
        />
      </Fragment>
    );
  }
}

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  /*  This function will provide a prop called 
    'updateNewItem' to our component. */
  // we're creating a key called updateItem and the value is itself
  // then we will use this prop
  // this fx will be invoked when we start typing aka being dispatched
  updateItem(item) {
    // Inside this function we can dispatch data to our reducer.
    dispatch(updateItem(item));
  },
  // ... other methods
  resetItem() {
    dispatch(resetItem());
  },
  resetItemImg() {
    dispatch(resetItemImg());
  }
});

// export default withStyles(styles)(ShareItemForm);
// since we don't have mapStateToProps, it will be null
// it is part of the first argument

export default connect(
  null,
  mapDispatchToProps
)(withStyles(ShareItemForm));
