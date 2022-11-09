// Type for each query operation in History Log (production)
export type QueryType = {
  id: string;
  operation_name: string;
  query_string: string;
  execution_time: number;
  created_at: string;
  success: boolean;
}

// Type for each query operation in History Log (development)
export type QueryTypeDev = {
  id: string;
  operation_name: string;
  execution_time: number;
  created_at: string;
  success: boolean;
}

// Type for each query displayed in History Log table (production)
export type OperationLogTable = {
  id: number;
  operation_name: string;
  req_count: number;
  avg_res_time: string;
  // avg_res_size: number;  // currently not used
  error_count: number;
}

// Type for Project received from GraphQL, id and project_name are required in the response data
export type ProjectType = {
  id: string;
  project_name: string;
  api_key?: string;
  server_url?: string;
}