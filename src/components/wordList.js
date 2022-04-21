import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((themes) => ({
    wordlist: {
        height: '15%',
        width: '15%',
        overflowY: 'scroll',
        marginLeft: "50%"

    },
    listItems: {
        width: '100%',
        height: '15%',
        border: '1px solid',
        borderRadius: '7px',
        listStyle: 'none',
        display: 'center',
        fontSize: '17px',
        color: 'white',
        marginBottom: "5px",
        wordBreak: 'break-all'
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