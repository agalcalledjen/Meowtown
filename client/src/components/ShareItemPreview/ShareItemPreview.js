import React, { Component, Fragment } from 'react';
import ItemCard from './../ItemCard/ItemCard';

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const blankItem = {
      borrower: 'null',
      description: '',
      id: 'X',
      imageurl: '',
      itemowner: {
        bio: '',
        email: '',
        fullname: '',
        id: ''
      },
      tags: [
        {
          id: '',
          title: ''
        }
      ],
      title: ''
    };
    return (
      <Fragment>
        <ItemCard item={blankItem} />
      </Fragment>
    );
  }
}

export default ShareForm;
