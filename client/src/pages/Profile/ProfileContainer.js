import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    // profile/userid here
    const id = this.props.match.params.userid || '1';
    return (
      <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: id }}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          // console.log(data);
          return <Profile classes={this.props.classes} user={data.user} />;
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ProfileContainer);
