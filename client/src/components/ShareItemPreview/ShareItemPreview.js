import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from './../ItemCard/ItemCard';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return <ItemCard item={shareItemPreview} />;
};

ShareItemPreview.propType = {
  shareItemPreview: PropTypes.shape({
    borrower: PropTypes.string,
    description: PropTypes.string.isRequired,
    id: PropTypes.string,
    imageurl: PropTypes.string.isRequired,
    itemowner: PropTypes.objectOf(PropTypes.string.isRequired),
    tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
    title: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(ShareItemPreview);
