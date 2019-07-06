import React, { useState } from "react";

const Search = () => {
  const [search, updateSearch] = useState("");

  const getData = async () => {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon/' + search;
      const response = await fetch(url);
      const json = await response.json();
      console.log(JSON.stringify(json));
    }
    catch(error) {
      console.log(error);
    }
  }

  const submitSearch = () => {
    if (search) {
      getData();
    } else {
      alert("You need to type something first!")
    }
    if (search === 'clear') {
      updateSearch("");
    }
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        placeholder="Search..." 
        onChange={e => updateSearch(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            submitSearch();
          }
        }}
      />
      <button onClick={submitSearch}>Submit</button>
      <p>Searching for {search || "nothing"}...</p>
    </div> 
  );
}

export default Search;