import React from 'react';
import ItemCard from './../ItemCard/ItemCard';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return <ItemCard item={shareItemPreview} />;
};

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(ShareItemPreview);
