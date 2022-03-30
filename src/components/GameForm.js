import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((themes) => ({
    form: {
        width: '50%',
        height: '60%',
        margin: '5px',
        display: 'inline-block'
    }
}));

const GameForm = (props) => {
    const classes = styles();
    const {game, setExclude, setInclude} = props;

    // console.log('game form for', game);
    if(game === 'wordle'){
        return (  
            <div className={classes.form}>
                <label>Enter letters that arent in word</label>
                <input onChange={(e) => setExclude(e.target.value)} type='text'></input>
            </div> 
         );
    }
    else{ // wordscapes
       return (  
           <div className={classes.form}>
               <label>Enter all letters</label>
               <input onChange={(e) => setInclude(e.target.value)} type='text'></input>
           </div> 
        );
    }
};

export default GameForm