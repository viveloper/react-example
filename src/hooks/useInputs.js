import { useReducer, useCallback } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'RESET':
      return {
        username: '',
        email: '',
      };
    default:
      throw new Error('Unhandled action');
  }
};

function useInputs(initialState) {
  const [inputs, dispatch] = useReducer(reducer, initialState);

  const onChange = useCallback((e) => {
    dispatch({
      type: 'CHANGE',
      name: e.target.name,
      value: e.target.value,
    });
  }, []);

  const reset = useCallback((e) => {
    dispatch({
      type: 'RESET',
    });
  }, []);

  return [inputs, onChange, reset];
}

export default useInputs;
