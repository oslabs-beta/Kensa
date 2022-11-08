import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Alert, AlertIcon, Box, Center, Spinner } from "@chakra-ui/react";
import { QueryTypeDev } from "../types/types";
import { format } from 'date-fns';


type HistoryLogDevProps = {
  selectedProjectId: string;
}

const HistoryLogDev = ({ selectedProjectId }: HistoryLogDevProps) => {
  console.log(selectedProjectId);

  if (selectedProjectId === '') {
    return null;
  }


  const GET_PROJECT = gql`
    query GetProject($projectId: ID!) {
      project(id : $projectId) {
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

  const { loading, error, data, refetch } = useQuery(GET_PROJECT, {
    variables: {
      projectId: selectedProjectId
    }
  });

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

  const headers = [
    { label: 'Query #' },
    { label: 'Operation Name' },
    { label: 'Time (ms)' },
    { label: 'Time Sent'},
    { label: 'Error' }
  ];

  return (
    <Box p={5}>
      <button onClick={() => refetch({projectId: selectedProjectId})}>Refresh</button>
      <table>
        <thead>
          <tr>
            {headers.map((header, i) => {
              return (
                <td key={i}>{header.label}</td>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.project['history_log_dev'].map((query: QueryTypeDev, index: number) => {
            const queryDate = new Date(parseInt(query['created_at']));
            const formatDate = format(queryDate, 'MMM dd yyyy HH:mm:ss');
            return (
              <tr key={query.id}>
                <td>{index + 1}</td>
                <td>{query.operation_name}</td>
                <td>{query.execution_time}</td>
                <td>{formatDate}</td>
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