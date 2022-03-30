import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((themes) => ({
    wordlist: {
        height: '5%',
        width: '95px',
        marginLeft: '125%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '25px',
        paddingTop: '5px',
        overflowY: 'scroll'

    },
    listItems: {
        width: '95px',
        height: '20px',
        border: '1px solid ',
        borderRadius: '7px',
        listStyle: 'none',
        display: 'center',
        padding: '1%',
        fontSize: '17px',
        color: 'white',
        margin: '7px'
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