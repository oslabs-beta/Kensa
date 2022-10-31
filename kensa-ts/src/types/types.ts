export type QueryType = {
  id: string;
  operation_name: string;
  query_string: string;
  execution_time: number;
  created_at: string;
  success: boolean;
}

// export type Data = {
//   id: number;
//   operation_name: string;
//   req_count: number;
//   avg_res_size: number;
//   avg_res_time: number;
//   error_count: number;
// }