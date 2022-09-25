import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { DataContext } from '../../contexts/DataContextProvider';

function ListItem(props) {
  const item = props.item;

  return (
    <li>
      <Link to={`/${item.id}/`}>
        {item.title}
      </Link>
    </li>
  );
}

export function NavList() {

  const data = useContext(DataContext);

  const listItems = data?.map((item, index) => 
    <ListItem key={ index } item={ item } />
  );

  return (
    <ul className="list-inside list-disc">  
      {listItems}
    </ul>
  );
}

