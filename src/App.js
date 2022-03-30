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
    if(game === 'select one'){
      return;
    }

    const letters = game === 'wordscape' ? includeLetters : excludeLetters; 
    if(!letters){
      return;
    }
    debounceGetWords(game, letters);
  },[includeLetters, excludeLetters]);
  
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
  }
  const setExcludeLetters = (letters) => {
    setExclude(letters);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h5>
          Find the word you're looking for
        </h5>
      </header>
      <div className='game-list'>
          <label htmlFor="game-select"> chose game</label>
          <select id="game-select" onChange={(e) => setGame(e.target.value)}>
            <option value="select one">select one</option>
            <option value="wordle">wordle</option>
            <option value="wordscape">wordscape</option>
          </select>
        </div>
        <div className='letters'>
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
        </div>
        <div className='words'>
          {
            words?.length > 0 && (includeLetters || excludeLetters ) ? 
            (
              <div className='api-results'>
                <WordList words={words}></WordList>
              </div>
            ) : null
          }
        </div>
    </div>
  );
}

export default App;
