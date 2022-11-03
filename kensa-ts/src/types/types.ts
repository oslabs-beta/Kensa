export type QueryType = {
  id: string;
  operation_name: string;
  query_string: string;
  execution_time: number;
  created_at: string;
  success: boolean;
}

export type QueryTypeDev = {
  id: string;
  operation_name: string;
  execution_time: number;
  created_at: number;
  success: boolean;
}

export type OperationLogTable = {
  id: number;
  operation_name: string;
  req_count: number;
  avg_res_time: number;
  // avg_res_size: number;
  error_count: number;
}