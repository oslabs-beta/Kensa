import React, { useState, useCallback, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import CodeMirror from '@uiw/react-codemirror';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router-dom";

const PlaygroundContainer = () => {
  // const [query, setQuery] = useState();
  let query: any;
  const {username} = useParams();
  // logic check - check for token, make sure they have the token with decode
  const token = Cookies.get('token');
  const userInCookie = Cookies.get('username');
  console.log('username in playground ', username, userInCookie);
  if (!token || userInCookie !== username) {
    return (
      <div>Please login. You do not have access to this page</div>
    );
  }
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
      .catch(err => console.log(err));
  };

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