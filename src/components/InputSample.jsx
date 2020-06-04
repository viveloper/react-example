import React, { useState, useRef } from 'react';

const InputSample = () => {
  const [inputs, setInputs] = useState({ name: '', nickname: '' });

  const nameInput = useRef();

  const { name, nickname } = inputs;

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetClick = () => {
    setInputs({ name: '', nickname: '' });
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleInputChange}
        ref={nameInput}
      />
      <input
        type="text"
        name="nickname"
        placeholder="Nickname"
        value={nickname}
        onChange={handleInputChange}
      />
      <button onClick={handleResetClick}>reset</button>
      <div>
        {name}({nickname})
      </div>
    </div>
  );
};

export default InputSample;
