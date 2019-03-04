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
import { Mutation } from 'react-apollo';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();

    this.state = {
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

  render() {
    const { classes, tags, updateItem, resetItem, resetItemImg } = this.props;

    return (
      <Fragment>
        <Typography variant="display2" className={classes.headline}>
          Share. Borrow.
        </Typography>
        <Typography variant="display2" className={classes.headline}>
          Blep.
        </Typography>
        <Mutation mutation={ADD_ITEM_MUTATION}>
          {addItemMutation => {
            return (
              <Form
                onSubmit={async values => {
                  addItemMutation({
                    variables: {
                      item: {
                        ...values,
                        tags: this.state.selectedTags.map(tag => ({
                          id: tag,
                          title: ''
                        }))
                      }
                      // image: this.fileInput
                    }
                  });
                }}
                validate={values => {
                  return validate(
                    values,
                    this.state.selectedTags,
                    this.state.fileSelected
                  );
                }}
                render={({
                  handleSubmit,
                  submitting,
                  pristine,
                  invalid,
                  form
                }) => (
                  <form
                    className={classes.container}
                    onSubmit={event =>
                      handleSubmit(event).then(() => {
                        this.fileInput.current.value = '';
                        this.setState({ fileSelected: false });
                        resetItemImg();

                        // Form.reset();
                        resetItem();
                        this.setState({ selectedTags: [] });
                        return false;
                      })
                    }
                  >
                    <FormSpy
                      subscription={{ values: true }}
                      component={({ values }) => {
                        if (values) {
                          this.dispatchUpdate(values, tags, updateItem);
                        }
                        return '';
                      }}
                    />

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
                            classes={{
                              root: classes.cssLabel
                            }}
                          />
                          <TextField
                            id="itemNameInput"
                            className={classes.input}
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
                          <Input
                            id="item-description-input"
                            className={classes.input}
                            multiline
                            rows="4"
                            placeholder="Description"
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
                                <ListItemText
                                  primary={tag.title}
                                  className={classes.capitalize}
                                />
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
                      color="primary"
                      className={classes.shareButton}
                      disabled={submitting || pristine || invalid}
                      type="submit"
                    >
                      Share
                    </Button>
                  </form>
                )}
              />
            );
          }}
        </Mutation>
      </Fragment>
    );
  }
}

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },

  resetItem() {
    dispatch(resetItem());
  },
  resetItemImg() {
    dispatch(resetItemImg());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));
