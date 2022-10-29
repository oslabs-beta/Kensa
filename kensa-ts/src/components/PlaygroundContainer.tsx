import React, { useState, useCallback, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import CodeMirror from '@uiw/react-codemirror';


const PlaygroundContainer = () => {
    // const [query, setQuery] = useState();
    let query: any;
    const SUBMIT_QUERY = `query Project {
        project(id: "4") {
          name
          description
          status
        }
      }`;
    
    const handleQueryChange = useCallback((value: any, viewUpdate: any) => {
        // console.log('values: ', value);
        query = value;
    }, []);

    const handleSubmitQuery = () => {
        console.log(query);
        fetch('http://localhost:3050/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return (
        <div id="graphql-playground" className="secondary-container">
            <h2>GraphQL Playground</h2>
            <CodeMirror
                value={query}
                height="200px"
                //   extensions={[javascript({ typescript: true })]}
                onChange={handleQueryChange}
            />
            <button onClick={handleSubmitQuery}>Submit</button>
        </div>
    );
};

export default PlaygroundContainer;