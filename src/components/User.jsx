import React, { useContext, useCallback } from 'react';
import { UserDispatch } from '../App';

const User = ({ user }) => {
  const dispatch = useContext(UserDispatch);

  const onToggle = useCallback(
    (id) => {
      dispatch({
        type: 'TOGGLE_USER',
        id,
      });
    },
    [dispatch]
  );

  const onRemove = useCallback(
    (id) => {
      dispatch({
        type: 'REMOVE_USER',
        id,
      });
    },
    [dispatch]
  );

  return (
    <div>
      <b
        style={{ color: user.active ? 'green' : 'black', cursor: 'pointer' }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>{' '}
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>delete</button>
    </div>
  );
};

export default React.memo(User);
