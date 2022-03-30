import './App.css';
import {useEffect, useState, useCallback} from 'react';
import WordList from './components/wordList';
import GameForm from './components/GameForm';
import debounce from 'lodash.debounce';



function App() {
  const [game, setGame] = useState("select one");
  const [words, setWords] = useState(null);
  const [excludeLetters, setExclude] = useState('');
  const [includeLetters, setInclude] = useState('');

  useEffect(() => {
    console.log('game is:', game);
    if(game === 'select one'){
      console.log('returning... game selected is defualt value', game);
      return;
    }

    const letters = game === 'wordscape' ? includeLetters : excludeLetters; 
    if(!letters){
      return;
    }
    debounceGetWords(game, letters);
  },[includeLetters, excludeLetters]);
  
  // const 
  const getWords = (game, letters) => {
    
    fetch(`/${game}/${letters}`)
      .then(resp => resp.json())
      .then(res => {
        console.log('res from api: ', res);
        setWords(res['words']);
      }); 
    
  };

  const debounceGetWords = useCallback(
    debounce((game, letters) => {
      getWords(game, letters);
    }, 1000), []
  );

  const setIncludeLetters = (letters) => {
    setInclude(letters);
    console.log('including letters: ', letters);
  }
  const setExcludeLetters = (letters) => {
    setExclude(letters);
    console.log('excluding letters: ', letters);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Find the word you're looking for
        </p>
        <div className='form'>
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
