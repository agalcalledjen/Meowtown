import React, { Component } from 'react';
import Share from './Share';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';

class ShareContainer extends Component {
  render() {
    const id = this.props.match.params.userid || '5';
    return (
      <Query query={ALL_TAGS_QUERY} variables={{ id: id }}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          console.log(data);
          return <Share classes={this.props.classes} tags={data.tags} />;
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ShareContainer);
