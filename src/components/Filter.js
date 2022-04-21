import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((themes) => ({
    filter: {
        height: '15%',
        width: '85%',
        marginTop: "40px",
        marginBottom: "-15px",
        display: "inline",
        alignItems: 'center',
        justifyContent: "center",
        border: "solid 1px grey",
        borderRadius: "3px"
    }
}));
   

const Filter = (props) => {
    const classes = styles();
    const {setFilter} = props;

    const handleFilterChange = (filter) => {
        filter = parseInt(filter) ? filter : null;
        if(!filter ||  filter > 5 || filter < 3){
            setFilter(''); // add alert
        } else {
            setFilter(filter);
        }
    };

    return (
        <div>
            <input 
                type="text"
                className={classes.filter}
                placeholder="Filter by word length..."
                onChange = {(e) => handleFilterChange(e.target.value)}
            ></input>
        </div>
    );
};

export default Filter