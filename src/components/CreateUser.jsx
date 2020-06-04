import React, { useContext, useCallback, useRef } from 'react';
import useInputs from '../hooks/useInputs';
import { UserDispatch } from '../App';

const CreateUser = () => {
  const dispatch = useContext(UserDispatch);

  const [inputs, onChange, reset] = useInputs({
    username: '',
    email: '',
  });

  const { username, email } = inputs;

  let nextId = useRef(4);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current++;
    reset();
  }, [username, email, reset, dispatch]);

  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        value={email}
        onChange={onChange}
      />
      <button onClick={onCreate}>submit</button>
    </div>
  );
};

export default React.memo(CreateUser);
