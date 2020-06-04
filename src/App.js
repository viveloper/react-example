import React, { useReducer, useMemo, createContext } from 'react';
import produce from 'immer';
import './App.css';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';

const countActiveUsers = (users) => {
  return users.filter((user) => user.active).length;
};

const initialState = {
  users: [
    {
      id: 1,
      username: 'viveloper',
      email: 'viveloper@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'brad',
      email: 'brad@gmail.com',
      active: false,
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return produce(state, (draftState) => {
        draftState.users.push(action.user);
      });
    // return {
    //   ...state,
    //   users: [...state.users, action.user],
    // };
    case 'TOGGLE_USER':
      return produce(state, (draftState) => {
        draftState.users.forEach((user) => {
          if (user.id === action.id) user.active = !user.active;
        });
      });
    // return {
    //   ...state,
    //   users: state.users.map((user) =>
    //     user.id === action.id ? { ...user, active: !user.active } : user
    //   ),
    // };
    case 'REMOVE_USER':
      return produce(state, (draftState) => {
        const idx = draftState.users.findIndex((user) => user.id === action.id);
        draftState.users.splice(idx, 1);
      });
    // return {
    //   ...state,
    //   users: state.users.filter((user) => user.id !== action.id),
    // };
    default:
      throw new Error('Unhandled action');
  }
};

export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>Active Users Count : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
