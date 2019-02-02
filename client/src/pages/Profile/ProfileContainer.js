import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';

const ProfileContainer = ({ classes, match }) => {
  // profile/userid here
  // const id = match.params.userid || '1';
  const id = match.params.userid;
  // To view profile of itemowner
  // console.log(match.params);

  return (
    <ViewerContext.Consumer>
      {({ viewer }) => (
        <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: id || viewer.id }}>
          {({ loading, error, data }) => {
            if (loading) return <FullScreenLoader inverted />;
            if (error) return <p>{`Error! ${error.message}`}</p>;
            // console.log(data);
            return <Profile classes={classes} user={data.user} />;
          }}
        </Query>
      )}
    </ViewerContext.Consumer>
  );
};

export default withStyles(styles)(ProfileContainer);
