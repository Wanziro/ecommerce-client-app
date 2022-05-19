import React from 'react';
import {useSelector} from 'react-redux';

import Client from './Client';
import User from './User';

function index() {
  const {email} = useSelector(state => state.currentUser);
  return <>{email != '' && email != null ? <User /> : <Client />}</>;
}

export default index;
