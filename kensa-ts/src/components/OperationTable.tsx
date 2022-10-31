import { Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, Td } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

type Data = {
  id: number;
  operation_name: string;
  req_count: number;
  avg_res_size: number;
  avg_res_time: number;
  error_count: number;
}

type SortKeys = "id" | "operation_name" | "req_count" | "avg_res_size" | "avg_res_time" | "error_count"

type SortOrder = 'ascn' | 'desc' 


const OperationTable = ({ data, setOperation }: any) => {
  const [sortKey, setSortKey] = useState<SortKeys>('operation_name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');

  const headers: { key: SortKeys, label: String }[] = [
    { key: 'id', label: 'ID' },
    { key: 'operation_name', label: 'Operation Name' },
    { key: 'req_count', label: 'Request Count' },
    { key: 'avg_res_size', label: 'Avg Response Size' },
    { key: 'avg_res_time', label: 'Avg Response Time' },
    { key: 'error_count', label: 'Error' },
  ];

  const sortData = useCallback(() => {
    if (!sortKey) return data;

    const sortedData = data.sort((a: Data, b: Data) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (sortOrder === 'desc') return sortedData.reverse();
     
    return sortedData;
  }, [data, sortKey, sortOrder]);

  const changeSort = (key: SortKeys) => {
    setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');
    setSortKey(key);
  };

  const handleShowMetrics = (op: any) => {
    setOperation(op.operation_name);
  };

  return (
    <TableContainer border='1px' borderColor='lightgray' borderRadius='5px'>
      <Table variant='striped' size='sm'>
        <TableCaption fontWeight='bold'>GraphQL Operation</TableCaption>
        <Thead>
          <Tr>
            {headers.map(row => {
              return (
                <Th key={row.key} bgColor='#4e67af' color='white' h='40px'>
                  {row.label}
                  <button onClick={() => changeSort(row.key)} className={`${
                    sortKey === row.key && sortOrder === 'desc' ? 'sort-btn sort-reverse' : 'sort-btn'
                  }`}>▲</button>
                </Th>
              );
            })}
          </Tr>
        </Thead>

        <Tbody>
          {sortData().map((op: any) => {
            return (
              <Tr key={op.id} onClick={() => handleShowMetrics(op)}>
                <Td>{op.id}</Td>
                <Td>{op.operation_name}</Td>
                <Td>{op.req_count}</Td>
                <Td>{op.avg_res_size}</Td>
                <Td>{op.avg_res_time}</Td>
                <Td>{op.error_count}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OperationTable;