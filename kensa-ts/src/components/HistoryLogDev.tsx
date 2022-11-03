import { gql, useQuery } from "@apollo/client";
import { Alert, AlertIcon, Box, Center, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import QueryLog from "./QueryLog";
import Cookies from "js-cookie";
import { QueryTypeDev } from "../types/types";
import { query } from "express";

const HistoryLogDev = (props: any) => {
  // console.log(props);
  // const fullLogs = props.logs;

  // const logs: Array<JSX.Element> = [];
  // for (let i = 0; i < fullLogs.length; i++) {
  //   logs.push(<QueryLog created_at={fullLogs[i]["created_at"]} execution_time={fullLogs[i]["execution_time"]} query_string={fullLogs[i]["query_string"]} success={fullLogs[i]["success"]} key={i} />);
  // }
  const projectId = Cookies.get('projectId');

  const GET_PROJECT = gql`
    query GetProject($projectId: ID!) {
      project(id : $projectId) {
        project_name
        history_log_dev {
          id
          operation_name
          execution_time
          created_at
          success
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {
      projectId: projectId
    }
  })

  if (loading) {
    return (
      <Center w='100%' h='100%'>
        <Spinner size='xl'/>
      </Center>
    );
  }
  
  if (error) {
    return (
      <Center w='100%' h='100%'>
        <Alert status='error' h='100px' w='50%' borderRadius='10px'>
          <AlertIcon />
          There was an error processing your request
        </Alert>
      </Center>
    );
  }

  console.log(data);

  // const GET_HISTORY_LOG_DEV = gql`
  //   query GetHistoryLogDev {}  
  // `;

  const headers = [
    { label: 'Query #' },
    { label: 'Operation Name' },
    { label: 'Time (ms)' },
    { label: 'Time Sent'},
    { label: 'Error' }
  ]

  return (
    <Box p={5}>
      <Heading size='md' marginBottom='10px'>History Logs</Heading>
      <table>
        <thead>
          <tr>
            {headers.map((header, i) => {
              return (
                <td key={i}>{header.label}</td>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {data.project['history_log_dev'].map((query: QueryTypeDev, index: number) => {
            return (
              <tr key={query.id}>
                <td>{index + 1}</td>
                <td>{query.operation_name}</td>
                <td>{query.execution_time}</td>
                <td>{query.created_at}</td>
                <td>{query.success ? 'No' : 'Yes'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};

export default HistoryLogDev;