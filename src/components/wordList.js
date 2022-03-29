import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((themes) => ({
    wordlist: {
        height: '450px',
        width: '95px',
        overflow: 'hidden',
        overflowY: 'scroll'
    },
    listItems: {
        float: 'left',
        border: '1px solid ',
        borderRadius: '5px',
        listStyle: 'none',
        display: 'inline-block',
        width: '95px',
        margin: '2px',
        height: '15px',
        paddingBottom: '1%',
        fontSize: '17px'
    }
}));
   

const WordList = (props) => {
    const classes = styles();
    const {words} = props;
    return (
        <ul className={classes.Wordlist}>
            {
                words.map(word => <li className={classes.listItems} key={word}>{word}</li>)
            }
        </ul>
    );
};

export default WordList