import React, { useState } from 'react';

const Form = ({ handleWord }) => {
  const [word, setWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (word.length === 5) {
      handleWord(word);
      setWord("");
    }
  }

  const handleChange = (e) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z]+$/;

    if ((value.length <= 5 && regex.test(value)) || value.length === 0) {
      setWord(e.target.value.toUpperCase());
    }
  }


  return <form onSubmit={handleSubmit} className="guess-input-wrapper">
    <label htmlFor="guess-input">Enter guess:</label>
    <input id="guess-input" type="text" value={word} onChange={handleChange} />
  </form>
}

export default React.memo(Form);