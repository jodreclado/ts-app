import React, { useState, useEffect } from "react";

interface Astronaut {
  name: string;
  craft: string;
}

interface Response {
  message: string;
  number: number|string;
  people: Astronaut[];
}

const Results = () => {
  const [data, setData] = useState<Response>({
    message: "pending",
    number: "unknown",
    people: []
  });

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();
    (async() => {
      try {
        const res = await fetch(
          "http://api.open-notify.org/astros.json",
          { signal: abortController.signal }
        );
        const json = await res.json();
        if (mounted) setData(json);
      }
      catch(error) {
        console.log(error.name, error.message);
        if (mounted) {
          setData({ ...data, message: "failure" });
        }  
      }
    })();
    const cleanup = () => {
      mounted = false;
      abortController.abort();
    };
    return cleanup;
  })

  return (
    <div>
      <h2>How Many People Are In Space Right Now?</h2>    
      Request data: {data.message}<br />
      Number of people: {data.number}<br />
      <ul>
        {data.people.map(({ name, craft }) => 
          <li key={name}>{name} ({craft})</li>
        )}
      </ul>
      {"Data is fetched from Open Notify's "} 
      <a href="http://open-notify.org/Open-Notify-API/People-In-Space/">astronaut API.</a>
    </div>
  );
};

export default Results;