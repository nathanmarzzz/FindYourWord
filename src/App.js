import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import WordList from './components/wordList';
import GameForm from './components/GameForm';


function App() {
  const [game, setGame] = useState("select one");
  const [words, setWords] = useState(null);
  const [excludeLetters, setExclude] = useState('');
  const [includeLetters, setInclude] = useState('');

  useEffect(() => {
    if(game === 'select one'){
      console.log('returning... game selected is defualt value');
      return;
    }

    const letters = game === 'wordscape' ? includeLetters : excludeLetters; 
    if(!letters){
      return;
    }
    console.log('sedning: ',letters)
    fetch(`/${game}/${letters}`)
      .then(resp => resp.json())
      .then(res => {
        console.log('res from api: ', res);
        setWords(res['words']);
      });

  },[game, excludeLetters, includeLetters]);

  // from wordle
  const setExcludeLetters = (excludeLetters) => {
    console.log('setting exclude: ', excludeLetters);
    setExclude(excludeLetters)
  }

  // will be from wordscape 
  const setIncludeLetters = (includeLetters) => {
    console.log('setting: include: ', includeLetters);
    setInclude(includeLetters)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Find the word you're looking for
        </p>
        <div >
          <label htmlFor="game-select"> chose game</label>
          <select id="game-select" onChange={(e) => setGame(e.target.value)}>
            <option value="select one">select one</option>
            <option value="wordle">wordle</option>
            <option value="wordscape">wordscape</option>
          </select>
          <p> selected value is: {game}</p>
          {
            game !== "select one" ?
            (
              <div className='gameForm'>
                <GameForm 
                  game={game}
                  setExclude={setExcludeLetters}
                  setInclude={setIncludeLetters}
                ></GameForm>
            </div>
            ) : null
          }
          {
            words ? 
            (
              <div className='api-results'>
                <WordList words={words}></WordList>
              </div>
            ) : null
          }
        </div>
      </header>
    </div>
  );
}

export default App;
