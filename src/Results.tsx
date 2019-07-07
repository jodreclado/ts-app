import React, { useState, useEffect } from "react";

interface Astronaut {
  name: string;
  craft: string;
}

const Results = () => {
  const [data, setData] = useState({
    message: "loading",
    number: "loading",
    people: [] as Astronaut[]
  });

  // temp fix for mem leak warning
  // cancel fetch on unmount
  // https://itnext.io/how-to-create-react-custom-hooks-for-data-fetching-with-useeffect-74c5dc47000a
  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();
    (async() => {
      const prepend = "https://cors-anywhere.herokuapp.com/";  // since gh-pages blocks http
      try {
        const res = await fetch(prepend + 
          "http://api.open-notify.org/astros.json",
          { signal: abortController.signal }
        );
        if (!res.ok) {
          throw Error(res.statusText);
        }
        const json = await res.json();
        if (mounted) setData(json);
      }
      catch(error) {
        console.log(error);
        if (mounted) {
          setData({
            message: "error",
            number: "unknown",
            people: []
          })
        }  
      }
    })();
    const cleanup = () => {
      mounted = false;
      abortController.abort();
    };
    return cleanup;
  }, []);

  let body;
  if (data.message === "loading") {
    body = <p>Retrieving data...</p>;
  } else if (data.message === "success") {
    body = <div>
      Request data: {data.message}<br />
      Number of people: {data.number}<br />
      <ul>
        {data.people.map(({ name, craft }) => 
          <li key={name}>{name} ({craft})</li>
        )}
      </ul>
    </div>;
  } else {
    body = <p>Could not retrieve data.</p>;
  }

  return (
    <div>
      <h2>How Many People Are In Space Right Now?</h2>    
      {body}
      {"Data is fetched from Open Notify's "} 
      <a href="http://open-notify.org/Open-Notify-API/People-In-Space/">astronaut API.</a>
    </div>
  );
};

export default Results;