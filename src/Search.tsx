import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";

const Search = () => {
  const [search, updateSearch] = useState("");  // bar text
  const [query, updateQuery] = useState("");
  const [data, updateData] = useState(null);
  const [status, updateStatus] = useState("pending");
  const [number, updateNum] = useState(0);

  const getData = async () => {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon/' + query.toLowerCase();
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      updateData(json);
      updateStatus("loaded");
      updateNum(json.id);
    }
    catch(error) {
      console.log(error);
      updateStatus("error");
    }
  }

  const submitQuery = () => {
    if (query) {
      getData();
      updateSearch("");
    }
  }

  // hook update is asynchronous, so next and prev buttons
  // didn't work properly without callback tied to query
  // hence the addition of the search variable as a temp fix
  useEffect(submitQuery, [query]);

  const prevPokemon = () => {
    if (status === "loaded" && number > 1) {
      updateQuery((number - 1).toString());
    }
  }

  const nextPokemon = () => {
    if (status === "loaded" && number < 721) {
      updateQuery((number + 1).toString());
    }
  }

  return (
    <div>
      <h2>Find Pokemon Data</h2>
      <input
        type="text"
        value={search}
        placeholder="Search by name or number" 
        onChange={e => updateSearch(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            updateQuery(search);
          }
        }}
      />
      <button onClick={() => updateQuery(search)}>Submit</button>
      <hr />
      <button onClick={prevPokemon}>Prev</button>
      <button onClick={nextPokemon}>Next</button>
      {status === "error" && <p>Searched for '{query}'.<br /></p>}
      {status === "loaded" ? (
        <Pokemon key={number} {...data!}/>
      ) : (
        <p>No Pokemon found.</p>
      )}
      <hr />
      {"Data is fetched from "} 
      <a href="https://pokeapi.co/">PokeAPI.</a>
    </div> 
  );
}

export default Search;