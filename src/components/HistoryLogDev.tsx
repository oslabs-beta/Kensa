import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Alert, AlertIcon, Box, Center, Flex, Spinner } from '@chakra-ui/react';
import { QueryTypeDev } from '../types/types';
import { TbRefresh } from 'react-icons/tb';
import { TiDelete } from 'react-icons/ti';
import { format } from 'date-fns';

type HistoryLogDevProps = {
  selectedProjectId: string;
};

const HistoryLogDev = ({ selectedProjectId }: HistoryLogDevProps) => {
  if (selectedProjectId === '') {
    return null;
  }

  // Get all history logs (development) of a project
  const GET_PROJECT = gql`
    query GetProject($projectId: ID!) {
      project(id: $projectId) {
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

  // Mutation query to delete all resolvers associated with an operation in Dev mode
  // User can delete by clicking on an operation in Logs table
  const DELETE_RESOLVERS_DEV = gql`
    mutation DeleteResolversDev($operationDevId: ID!) {
      deleteOperationResolverLogs(id: $operationDevId) {
        id
        resolver_name
        execution_time
        success
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_PROJECT, {
    variables: {
      projectId: selectedProjectId,
    },
  });

  // GraphQL mutation function to delete an operation in the table
  const [deleteOperationDev] = useMutation(DELETE_RESOLVERS_DEV, {
    // Refetch GET_PROJECT after delete an operation in the table
    refetchQueries: [
      { query: GET_PROJECT, variables: { projectId: selectedProjectId } },
    ],
  });

  if (loading) {
    return (
      <Center w="100%" h="100%">
        <Spinner size="xl" className="spinner" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center w="100%" h="100%">
        <Alert
          status="error"
          h="100px"
          w="50%"
          borderRadius="10px"
          id="log-dev-alert"
        >
          <AlertIcon />
          There was an error processing your request
        </Alert>
      </Center>
    );
  }

  // Headers for table
  const headers = [
    { label: 'Query #' },
    { label: 'Operation Name' },
    { label: 'Time (ms)' },
    { label: 'Time Sent' },
    { label: 'Error' },
  ];

  // Function to handle delete an operation in table
  const handleDeleteOperationDev = (operationId: string): void => {
    deleteOperationDev({
      variables: {
        operationDevId: operationId,
      },
    });
  };

  return (
    <Box>
      <Flex justifyContent="flex-end" marginBottom="10px">
        <Box
          onClick={() => refetch({ projectId: selectedProjectId })}
          _hover={{ cursor: 'pointer' }}
          fontSize="1.5rem"
        >
          <TbRefresh />
        </Box>
      </Flex>
      <Box id="log-dev">
        <table>
          <thead>
            <tr>
              {headers.map((header, i) => {
                return <td key={i}>{header.label}</td>;
              })}
              <td></td>
            </tr>
          </thead>

          <tbody>
            {data.project['history_log_dev'].map(
              (query: QueryTypeDev, index: number) => {
                const queryDate = new Date(parseInt(query['created_at']));
                const formatDate = format(queryDate, 'MMM dd yyyy HH:mm:ss');
                return (
                  <tr key={query.id}>
                    <td>{index + 1}</td>
                    <td>{query.operation_name}</td>
                    <td>{query.execution_time}</td>
                    <td>{formatDate}</td>
                    <td>{query.success ? 'No' : 'Yes'}</td>
                    <td
                      onClick={() => handleDeleteOperationDev(query.id)}
                      id="delete-btn"
                    >
                      <Flex justifyContent="center">
                        <TiDelete />
                      </Flex>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default HistoryLogDev;
