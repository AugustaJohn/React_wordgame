import { useEffect, useState } from 'react';
import { getRandomWord } from './SampleWords';
import './App.css';

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [hint, setHint] = useState(3);
  const [chosen, setChosen] = useState([]);
  const [message, setMessage] = useState();
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(0);

  function getHint() {
    if (hint > 0) {
      const letterIndex = Array.from(word.word).findIndex((letter) => !chosen.includes(letter));
      setChosen([...chosen, word.word[letterIndex]]);
      setHint(hint - 1);
    } 
  }

  function onRestart() {
    setWord(getRandomWord());
    setHint(3);
    setChosen([]);
    setMessage();
    setDisplayAnswer(false);
    setWrongGuess(0);
  }

  function displayLetters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const letterButtons = Array.from(letters).map((letter, index) => (
      <button className='m-1.5 px-3.5 py-2.5 text-base text-white font-bold rounded bg-[#2196f3] disabled:bg-[#ccc]'
        onClick={() => selectButton(letter)} disabled={chosen.includes(letter)}
        key={index}>{letter}</button>
    ))

    return letterButtons;
  }

  function selectButton(letter) {
    if(!chosen.includes(letter)) {
      setChosen(chosen => [...chosen, letter]);
    }
    if(!word.word.includes(letter)) {
      setWrongGuess(wrongGuess+1);
    }
  }

  function removeLetter() {
    setChosen(chosen.slice(0, -1));
  }

  function guessWord() {
    const guess = Array.from(word.word).every((letter) => chosen.includes(letter));

    if (guess) {
      setMessage("Congo Geek! You have guessed the word correctly!");
    } else {
      setMessage("You made a Wrong Guess Geek!. Try again!");
      setDisplayAnswer(true);
    }
  }

  useEffect(() => {
    if(wrongGuess === 3) {
      alert('Game Over! You made too many wrong guesses');
      onRestart();
    }
  })

  return (
    <div className='flex flex-col justify-center items-center bg-[#f5f5f5] min-h-screen'>
      <h1 className='font-bold text-4xl mb-8 text-[#15e402]'>Word Guess Game</h1>
      <div className='flex justify-center items-center mb-12'>
        {Array.from(word.word).map((letter, index) => (
          <div className='flex justify-center items-center w-14 h-14 rounded-full text-white bg-black opacity-100 font-bold text-2xl mx-1 transition-opacity duration-200 ease-in-out'
            key={index}> {chosen.includes(letter) ? letter : ''} </div>
        ))}
      </div>
      <p className='mb-5 font-bold text-lg text-black'>Hint : {word.description}</p>
      {message &&
        <div className='text-2xl font-bold text-[#333] text-center mb-5'>
          <p>{message}</p>
          {displayAnswer && <p>Correct word is: {word.word}</p>}
        </div>
      }
      <div className='mb-8 self-start'>
        <button className='commonButtons' onClick={onRestart}>Restart</button>
        <button className='commonButtons' disabled={!chosen.length} onClick={removeLetter} >Remove Letter</button>
      </div>
      <div className='flex justify-center flex-wrap mb-8'>
        {displayLetters()}
      </div>
      <div className='mb-5 font-bold text-xl text-[#333] self-start'>
        Hints Remaining: {hint}{'  '}
        <button className='commonButtons' disabled={hint === 0} onClick={getHint}>Get Hint</button>
      </div>
      <button className='commonButtons' disabled={!chosen.length} onClick={guessWord}>Guess</button>
    </div>
  );
}

export default App;
