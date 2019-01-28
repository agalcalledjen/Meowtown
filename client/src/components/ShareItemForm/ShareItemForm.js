import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';

import { validate } from './helpers/validation';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [0]
    };
  }

  /*  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  }; */

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
    this.setState({ name: event.target.value });
  };

  onSubmit(o) {
    console.log('Submitting:', o);
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
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography
          variant="display3"
          // className={classes.headline}
        >
          Share. Borrow.
        </Typography>
        <Typography
          variant="display3"
          // className={classes.headline}
        >
          Prosper.
        </Typography>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit }) => (
            <form
              className={classes.container}
              // noValidate autoComplete="off"
            >
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
                    {/* // <div className="field"> */}
                    {/* <TextField
                      id="standard-with-placeholder"
                      label="Name your item"
                      className={classes.textField}
                      margin="normal"
                      inputProps={input}
                    /> */}
                    <InputLabel
                      // htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused
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
                          className="error"
                          style={{
                            color: 'red',
                            fontSize: '0.8rem',
                            margin: '1rem'
                          }}
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
                      id="standard-bare"
                      className={classes.input}
                      multiline
                      rows="4"
                      defaultValue="Description"
                      // margin="normal"
                    />
                    {meta.touched &&
                      meta.invalid && (
                        <div
                          className="error"
                          style={{
                            color: 'red',
                            fontSize: '0.8rem',
                            margin: '1rem'
                          }}
                        >
                          {meta.error}
                        </div>
                      )}
                  </FormControl>
                )}
              />
              {/* <Field
                name="tags"
                render={({ tags, input, meta }) => (
                  <div className="field">
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="select-multiple-checkbox">
                        Add some tags
                      </InputLabel>
                      <Select
                        multiple
                        value={tags}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        // MenuProps={MenuProps}
                        // onChange={this.handleChange}
                        inputProps={{ name: 'Item tag' }}
                      >
                        {tags.map(tag => (
                          <MenuItem key={tag.id} value={tag.title}>
                            <Checkbox checked={tag.indexOf(tag) > -1} />
                            <ListItemText primary={tag.title} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
              /> */}

              <Button
                variant="contained"
                // color="primary"
                // disabled
                className={classes.shareButton}
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

// ShareForm.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(ShareForm);
