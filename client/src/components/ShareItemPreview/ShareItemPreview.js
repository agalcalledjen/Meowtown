import React, { Fragment } from 'react';
import ItemCard from './../ItemCard/ItemCard';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return (
    // <Fragment>
    <ItemCard item={shareItemPreview} />
    // </Fragment>
  );
};

// export default ShareItemPreview;

const mapStateToProps = state => ({
  // This is the reducer we set up in Exercise 3
  // implicit return
  shareItemPreview: state.shareItemPreview
});

// connect is a fx that takes in two arguments, mapStateToProps and ShareItemPreview
export default connect(mapStateToProps)(ShareItemPreview);
