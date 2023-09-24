import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import Form from './Form';
import Grid from './Grid';
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
// const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.

function Game() {
  const [answer, setAnswer] = useState(() => sample(WORDS));
  const [words, setWords] = useState([]);
  const [status, setStatus] = useState("");

  console.log({ answer });

  const handleWord = (word) => {
    if (words.length <= NUM_OF_GUESSES_ALLOWED) {
      const guess = checkGuess(word, answer);
      const isCorrect = guess.every(v => v.status === "correct");


      const copyWords = [...words];
      copyWords.push({
        id: Math.random(),
        guess,
      });

      setWords(copyWords);

      if (isCorrect) {
        setStatus("win");
      } else if (copyWords.length === NUM_OF_GUESSES_ALLOWED) {
        setStatus("lose");
      }
    }
  }

  const handleRestart = () => {
    setAnswer(sample(WORDS));
    setWords([]);
    setStatus("");
  }

  return <>
    <Grid words={words} />
    <Form handleWord={handleWord} />
    {
      status === "win" && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in
            <strong>{words.length} guesses</strong>.
          </p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )
    }
    {
      status === "lose" && (<div className="sad banner">
        <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
        <button onClick={handleRestart}>Restart</button>
      </div>)
    }
  </>;
}

export default Game;
