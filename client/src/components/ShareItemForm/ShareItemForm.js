import React, { Component, Fragment } from 'react';
import { Typography, TextField } from '@material-ui/core';
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
import { Form, Field, FormSpy } from 'react-final-form';
import {
  updateItem,
  resetItem,
  resetItemImg
} from '../../redux/modules/ShareItem';
import { connect } from 'react-redux';

import { validate } from './helpers/validation';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();

    this.state = {
      // checked: [],
      fileSelected: false,
      done: false,
      selectedTags: []
    };
  }

  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  // looking at all the tags and filtering out for the selected tags only
  // checking index of selected tag and the tag
  // indexOf, use id since it is more of a unique identifier than t.title
  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  // Convert the selected image into a base64 string so that we can store it our database.
  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  handleSelectTags = event => {
    this.setState({ selectedTags: event.target.value });
  };

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  handleSelectFile = () => {
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  };

  // is this needed?
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

  onSubmit(input) {
    console.log('Submitting:', input);
  }

  // validate();

  // validate(o) {
  //   console.log('Validating:', o);
  //   const error = {};
  //   if (!o.title) {
  //     error.title = 'Title is required.';
  //   }
  //   if (!o.description) {
  //     error.description = 'Description is required.';
  //   }
  //   if (!o.tag) {
  //     error.tag = 'At least one tag is required.';
  //   }
  //   return error;
  // }

  render() {
    const { classes, tags, updateItem, resetItem, resetItemImg } = this.props;
    console.log(this.props);

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
          validate={values => {
            return validate(
              values,
              this.state.selectedTags,
              this.state.fileSelected
            );
          }}
          render={({ handleSubmit, submitting, pristine, invalid }) => (
            <form className={classes.container} onSubmit={handleSubmit}>
              {/* Insert FormSpy */}
              <FormSpy
                subscription={{ values: true }}
                component={({ values }) => {
                  if (values) {
                    console.log('VALUES', values);
                    this.dispatchUpdate(values, tags, updateItem);
                  }
                  return '';
                }}
              />
              {/* write a tetrany stmt to show certain btns if a file is selected */}
              {!this.state.fileSelected ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    this.fileInput.current.click();
                  }}
                >
                  Select An Image
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={() => {
                    this.fileInput.current.value = '';
                    this.setState({ fileSelected: false });
                    resetItemImg();
                  }}
                >
                  Reset Image
                </Button>
              )}
              <input
                type="file"
                id="fileInput"
                ref={this.fileInput}
                accept="image/*"
                onChange={() => {
                  this.handleSelectFile();
                }}
                hidden
              />
              <Field
                name="title"
                render={({ input, meta }) => (
                  <FormControl className={classes.field}>
                    <InputLabel
                      // htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel
                        // focused: classes.cssFocused
                      }}
                    />
                    <TextField
                      id="itemNameInput"
                      className={classes.input}
                      // classes={{
                      //   underline: classes.cssUnderline
                      // }}
                      // inputProps={input}
                      label="Name your item"
                      type="text"
                      {...input}
                    />
                    {meta.touched &&
                      meta.invalid && (
                        <div className={classes.error}>{meta.error}</div>
                      )}
                  </FormControl>
                )}
              />
              <Field
                name="description"
                render={({ input, meta }) => (
                  <FormControl className={classes.field}>
                    <TextField
                      id="item-description-input"
                      className={classes.input}
                      multiline
                      rows="4"
                      // defaultValue="Description"
                      placeholder="Description"
                      // margin="normal"
                      inputProps={input}
                    />
                    {meta.touched &&
                      meta.invalid && (
                        <div className={classes.error}>{meta.error}</div>
                      )}
                  </FormControl>
                )}
              />

              <Field
                name="tags"
                render={({ input, meta }) => (
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="select-multiple-checkbox">
                      Add some tags
                    </InputLabel>
                    <Select
                      multiple
                      value={this.state.selectedTags}
                      onChange={this.handleSelectTags}
                      input={<Input id="select-multiple-checkbox" />}
                      renderValue={selected =>
                        this.generateTagsText(tags, selected)
                      }
                      className={classes.tags}
                    >
                      {tags.map(tag => (
                        <MenuItem key={tag.id} value={tag.id}>
                          <Checkbox
                            checked={
                              this.state.selectedTags.indexOf(tag.id) > -1
                            }
                          />
                          <ListItemText primary={tag.title} />
                        </MenuItem>
                      ))}
                    </Select>
                    {meta.touched &&
                      meta.invalid && (
                        <div className={classes.error}>{meta.error}</div>
                      )}
                  </FormControl>
                )}
              />

              <Button
                variant="contained"
                // color="primary"
                // disabled
                className={classes.shareButton}
                disabled={submitting || pristine || invalid}
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
)(withStyles(styles)(ShareItemForm));
