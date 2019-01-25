import React, { Fragment } from 'react';
// import ItemsGrid from './ItemsGrid';
import ItemCard from '../../components/ItemCard';

const Items = ({ items }) => {
  // const { items } = data;

  return (
    <Fragment>
      {/* {console.log({ items })} */}
      {items.map(item => <p>{item.title}</p>)}
    </Fragment>
  );
};

export default Items;
