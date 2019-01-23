import React, { Component } from 'react';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import gql from 'graphql-tag';
// import { Query } from 'react-apollo';

/* // create query
const GET_TAGS = gql`
  {
    tags {
      id
      title
    }
  }
`;

class HomeContainer extends Component {
  render() {
    return (
      <Query query={GET_TAGS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          {
            console.log(data);
          }
          return <div />;
        }}
      </Query>
    );
    // return <Home classes={this.props.classes} />;
  }
} */
class HomeContainer extends Component {
  render() {
    return <Home classes={this.props.classes} />;
  }
}
export default withStyles(styles)(HomeContainer);
