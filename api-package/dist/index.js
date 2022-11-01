"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMetrics = exports.getProjectId = void 0;
const db_1 = require("./models/db");
const getProjectId = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, db_1.query)('SELECT id FROM projects WHERE api_key = $1;', [apiKey]);
    return result.rows[0];
});
exports.getProjectId = getProjectId;
const insertMetrics = (response, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    // cosnt { project_id } = GraphQL context object
    const { query_string, execution_time, success, operation_name } = response;
    const result = yield (0, db_1.query)('INSERT INTO history_log(query_string, project_id, execution_time, success, operation_name) VALUES($1, $2, $3, $4, $5) RETURNING *;', [query_string, projectId, execution_time, success, operation_name]);
    console.log(result.rows[0]);
    return result.rows[0];
});
exports.insertMetrics = insertMetrics;
// NPM package needs to find a way to use the API key to get their project ID
//   -An idea: get client to input API key into their code so that their project information can be received
//   -passing project ID into GraphQL context object so query results/metrics/projectID/resolvers can be inserted into database
//   -two methods needed : 
//     - kensa.getProjectId - getting project ID that takes in API key as argument 
//     - kensa.insertMetrics - after the query finishes executing, call the method passing in response object and project_id from the GraphQL context object
// import { query } from './models/db'
// export const kensa = {
//   getProjectId: async (apiKey: any): Promise<any> => {
//     const result = await query('SELECT id FROM projects WHERE api_key = $1;', [apiKey]);
//     return result.rows[0];
//   },
//   plugin: {
//     // Fires whenever a GraphQL request is received from a client. This plugin runs after whatever happens in ApolloServer's context
//     async requestDidStart(requestContext: any) {
//       // IntrospectionQuery keeps running in GraphQL server. Use this condition to stop context from logging for IntrospectionQuery
//       if (requestContext.request.operationName === 'IntrospectionQuery') return;
//       // Query string request sent by the client
//       // console.log(`Request started! Query: ${requestContext.request.query}`)
//       // console.log(`Request variable! Variable: ${requestContext.request.variables}`)
//       const requestStart = Date.now()
//       let op: string
//       return {
//         async executionDidStart(executionRequestContext: any) {
//           return {
//             willResolveField({source, args, contextValue, info}: any) {
//               const resolverStart = Date.now();
//               return (error: any, result: any) => {
//                 const resolverEnd = Date.now();
//                 console.log(`Field ${info.parentType.name}.${info.fieldName} took ${resolverEnd - resolverStart}ms`)
//                 // if (error) {
//                 //   console.log(`It failed with ${error}`)
//                 // } else {
//                 //   console.log(`It returned ${result}`)
//                 // }
//               }
//             }
//           }
//         },
//         async didResolveOperation(context: any) {
//           // context ==> { logger, cache, schema, request, response, contextValue, metrics, overallCachePolicy, queryHash, source, document }
//           op = context.operationName
//         },
//         async willSendResponse(context: any) {
//           // console.log(context.response.body.singleResult) // response data
//           const receiveResponse = Date.now()
//           const elapsed = receiveResponse - requestStart
//           console.log(`operation=${op} duration=${elapsed}ms`)
//           // Getting projectId from context object
//           const { id } = context.contextValue.projectId;
//           const query_string = context.request.query;
//           // construct a fake response for now
//           const fakeResponse = {
//             query_string: query_string,
//             execution_time: elapsed,
//             success: true
//           }
//           const insertMetrics= async (response: any, projectId: number) : Promise<any> => {
//             // cosnt { project_id } = GraphQL context object
//             const { query_string, execution_time, success } = response;
//             const result = await query('INSERT INTO history_log(query_string, project_id, execution_time, success) VALUES($1, $2, $3, $4) RETURNING *;', [query_string, projectId, execution_time, success])
//             console.log(result.rows[0]);
//             return result.rows[0];
//           }
//           // This insert metrics to Kensa database
//           await insertMetrics(fakeResponse, id);
//         }
//       }
//     }
//   }
// }
// export const getProjectId = async (apiKey: any): Promise<any> => {
//   const result = await query('SELECT id FROM projects WHERE api_key = $1;', [apiKey]);
//   return result.rows[0];
// }
// export const insertMetrics = async (response: any, projectId: number) : Promise<any> => {
//   // cosnt { project_id } = GraphQL context object
//   const { query_string, execution_time, success } = response;
//   const result = await query('INSERT INTO history_log(query_string, project_id, execution_time, success) VALUES($1, $2, $3, $4) RETURNING *;', [query_string, projectId, execution_time, success])
//   console.log(result.rows[0]);
//   return result.rows[0];
// }
//# sourceMappingURL=index.js.map