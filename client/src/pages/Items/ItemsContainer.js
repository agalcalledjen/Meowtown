import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import { ALL_TAGS_QUERY } from '../../apollo/queries';

class ItemsContainer extends Component {
  render() {
    return (
      <div>
        {/* // <Items /> */}
        <Query query={ALL_ITEMS_QUERY}>
          {({ loading, error, data }) => {
            // if (loading) return <FullScreenLoader inverted />;
            if (error) return <p>{`Error! ${error.message}`}</p>;
            console.log(data);
            return <Items classes={this.props.classes} items={data.items} />;
          }}
        </Query>
        {/* // <Tags /> */}
        {/* <Query query={ALL_TAGS_QUERY}>
          {({ loading, error, data }) => {
            // if (loading) return <FullScreenLoader inverted />;
            if (error) return <p>{`Error! ${error.message}`}</p>;
            console.log(data);
            return <Items classes={this.props.classes} items={data.items} />;
          }}
        </Query> */}
      </div>
    );
  }
}

export default withStyles(styles)(ItemsContainer);
