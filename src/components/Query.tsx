import { Flex, Text, Textarea, Button } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { QueryType } from '../types/types';
import { ChartContext } from './MetricContainer';

// Display query string of an operation
const Query = () => {
  const { operation, historyLogs } = useContext(ChartContext);
  const [copied, setCopied] = useState<boolean>(false);

  const queryString = historyLogs.find(
    (log: QueryType) => log.operation_name === operation
  ).query_string;

  function copyToClipboard(code: string) {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);

    // Copy the text inside the text field
    navigator.clipboard.writeText(code);
  }

  return (
    <>
      <Flex
        className="copyQuery"
        justifyContent="flex-end"
        pb="10px"
        h="20px"
        mt="0"
        mb="5px"
      >
        {copied ? (
          <Text pr="5px" color="gray">
            copied
          </Text>
        ) : (
          <></>
        )}
        <Button
          h="20px"
          bg="transparent"
          className="border-0"
          onClick={(e) => {
            copyToClipboard(queryString);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-clipboard"
            viewBox="0 0 16 16"
          >
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
          </svg>
        </Button>
      </Flex>
      <Textarea
        readOnly
        value={queryString}
        bg="whitesmoke"
        border="1px"
        borderColor="lightgray"
        size="sm"
        h="300px"
      />
    </>
  );
};

export default Query;
