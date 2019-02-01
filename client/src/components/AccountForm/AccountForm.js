import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
/**
 * @TODO: Uncomment the following lines when authentication is added to the form
 *
 * import { Form, Field } from 'react-final-form'
 *
 * import {
 *    LOGIN_MUTATION,
 *    SIGNUP_MUTATION,
 *    VIEWER_QUERY
 * } from '../../apollo/queries';
 * import { graphql, compose } from 'react-apollo';
 * import validate from './helpers/validation'
 */
import { Form, Field } from 'react-final-form';
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY // this asks for the cookie
} from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import validate from './helpers/validation';

import styles from './styles';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  // onSubmit = values => {
  //   console.log('Submitting:', values);

  //   if (this.state.formToggle) {
  //     this.props.loginMutation({
  //       variables: {
  //         user:
  //           // email: 'email2@gmail.com',
  //           // password: '12345'
  //           values
  //         // TODO: get login from form inputs
  //       }
  //     });
  //   } else {
  //     this.props.signupMutation({
  //       variables: {
  //         user:
  //           // fullname: '',
  //           // email: '',
  //           // password: ''
  //           values
  //         // TODO: get user from form inputs
  //       }
  //     });
  //   }
  // };

  onSubmit(values) {
    console.log('Submitting:', values);
  }

  render() {
    // console.log(this.props);

    const { classes } = this.props;

    return (
      // @TODO: Wrap in Final Form <Form />
      <Form
        onSubmit={this.onSubmit}
        validate={values => {
          return validate(
            values
            // this.state.selectedTags,
            // this.state.fileSelected
          );
        }}
        render={({ handleSubmit, submitting, pristine, invalid, values }) => (
          <form
            onSubmit={() => {
              console.log('Submitted');
            }}
            className={classes.accountForm}
          >
            {!this.state.formToggle && (
              <Field
                name="fullname"
                render={({ input, meta }) => (
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="fullname">Username</InputLabel>
                    {/* @TODO: Wrap in a Final Form <Field /> */}
                    <Input
                      id="fullname"
                      type="text"
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      value={''}
                    />
                    {/* @TODO: Close Final Form <Field /> */}
                    {meta.touched &&
                      meta.invalid && (
                        <div className={classes.errorMessage}>{meta.error}</div>
                      )}
                  </FormControl>
                )}
              />
            )}

            <Field
              name="email"
              render={({ input, meta }) => (
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  {/* @TODO: Wrap in a Final Form <Field /> */}
                  <Input
                    id="email"
                    type="text"
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={''}
                  />
                  {/* @TODO: Close Final Form <Field /> */}
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
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  {/* @TODO: Wrap in a Final Form <Field /> */}
                  <Input
                    id="password"
                    type="password"
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={''}
                  />
                  {meta.touched &&
                    meta.invalid && (
                      <div className={classes.error}>{meta.error}</div>
                    )}
                  {/* @TODO: Close Final Form <Field /> */}
                </FormControl>
              )}
            />

            <Field
              name="description"
              render={({ input, meta }) => (
                <FormControl className={classes.formControl}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Button
                      type="submit"
                      className={classes.formButton}
                      variant="contained"
                      size="large"
                      color="secondary"
                      onClick={e => {
                        e.preventDefault();

                        if (this.state.formToggle) {
                          this.props.loginMutation({
                            variables: {
                              user: {
                                email: 'email2@gmail.com',
                                password: '12345'
                              } // TODO: get login from form inputs
                            }
                          });
                        } else {
                          this.props.signupMutation({
                            variables: {
                              user: {
                                fullname: '',
                                email: '',
                                password: ''
                              } // TODO: get user from form inputs
                            }
                          });
                        }
                      }}
                      // disabled={
                      // @TODO: This prop should depend on pristine or valid state of form
                      //   submitting || pristine || invalid
                      // }
                    >
                      {this.state.formToggle ? 'Enter' : 'Create Account'}
                    </Button>
                    <Typography>
                      <button
                        className={classes.formToggle}
                        type="button"
                        onClick={() => {
                          // @TODO: Reset the form on submit
                          this.setState({
                            formToggle: !this.state.formToggle
                          });
                        }}
                      >
                        {this.state.formToggle
                          ? 'Create an account.'
                          : 'Login to existing account.'}
                      </button>
                    </Typography>
                  </Grid>
                  {meta.touched &&
                    meta.invalid && (
                      <div className={classes.error}>{meta.error}</div>
                    )}
                </FormControl>
              )}
            />

            <Typography className={classes.errorMessage}>
              {/* @TODO: Display sign-up and login errors */}
            </Typography>
          </form>
          // @TODO: Close Final Form <Form />
        )}
      /> // Field
    );
  }
}

// @TODO: Use compose to add the login and signup mutations to this components props.
// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.
// export default withStyles(styles)(AccountForm);

// export default compose(
//   graphql(SIGNUP_MUTATION, {
//     name: 'signupMutation'
//   }),
//   graphql(LOGIN_MUTATION, {
//     name: 'loginMutation'
//   }),
//   withStyles(styles)
// )(AccountForm);

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'signupMutation'
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'loginMutation'
  }),
  withStyles(styles)
)(AccountForm);
