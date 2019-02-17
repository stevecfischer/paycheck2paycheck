import React, { Fragment, useContext } from 'react';
import { FirebaseContext } from '../context';

const Header = (props) => {
  const isConnected = useContext(FirebaseContext);
  return (
    <Fragment>
      <h1>{props.text}</h1>
      <ul>
        <li>
          <button disabled={!isConnected} onClick={props.handleOnBalance}>
            Get Balance
          </button>
        </li>
      </ul>
      {props.children}
    </Fragment>
  );
};

export default Header;
