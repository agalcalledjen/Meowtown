import React, { Fragment } from 'react';
import ItemsGrid from '../../components/ItemsGrid';

const Items = ({ classes, items }) => {
  // const { items } = data;

  return (
    <Fragment>
      <ItemsGrid items={items} />
    </Fragment>
  );
};

export default Items;
