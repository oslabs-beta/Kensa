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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.insertMetrics = exports.getProjectId = void 0;
var db_1 = require("./models/db");
var getProjectId = function (apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, db_1.query)('SELECT id FROM projects WHERE api_key = $1;', [apiKey])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.rows[0]];
        }
    });
}); };
exports.getProjectId = getProjectId;
var insertMetrics = function (response, projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var query_string, execution_time, success, operation_name, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query_string = response.query_string, execution_time = response.execution_time, success = response.success, operation_name = response.operation_name;
                return [4 /*yield*/, (0, db_1.query)('INSERT INTO history_log(query_string, project_id, execution_time, success, operation_name) VALUES($1, $2, $3, $4, $5) RETURNING *;', [query_string, projectId, execution_time, success, operation_name])];
            case 1:
                result = _a.sent();
                console.log(result.rows[0]);
                return [2 /*return*/, result.rows[0]];
        }
    });
}); };
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
