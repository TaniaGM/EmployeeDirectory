import React from 'react';
import "./style.css";

const Search = ({ userinput, handler }) => {
    return (
        <nav className='searchbar'>
            <label><h3>Search Employees:</h3></label>
            <input name="userinput" onChange={handler} value={userinput} />
        </nav>
    );
}

export default Search;