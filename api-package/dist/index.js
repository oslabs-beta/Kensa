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
exports.testPlugin = exports.insertMetrics = exports.getProjectId = void 0;
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
exports.testPlugin = {
    requestDidStart(requestContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fires whenever a GraphQL request is received from a client. This plugin runs after whatever happens in ApolloServer's context
            // IntrospectionQuery keeps running in GraphQL server. Use this condition to stop context from logging for IntrospectionQuery
            if (requestContext.request.operationName === 'IntrospectionQuery')
                return;
            // Query string request sent by the client
            // console.log(`Request started! Query: ${requestContext.request.query}`)
            // console.log(`Request variable! Variable: ${requestContext.request.variables}`)
            const requestStart = Date.now();
            let op;
            return {
                executionDidStart(executionRequestContext) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            willResolveField({ source, args, contextValue, info }) {
                                const resolverStart = Date.now();
                                return (error, result) => {
                                    const resolverEnd = Date.now();
                                    console.log(`Field ${info.parentType.name}.${info.fieldName} took ${resolverEnd - resolverStart}ms`);
                                    if (error) {
                                        console.log(`It failed with ${error}`);
                                    }
                                    else {
                                        console.log(`It returned ${result}`);
                                    }
                                };
                            }
                        };
                    });
                },
                didResolveOperation(context) {
                    return __awaiter(this, void 0, void 0, function* () {
                        // context ==> { logger, cache, schema, request, response, contextValue, metrics, overallCachePolicy, queryHash, source, document }
                        op = context.operationName;
                    });
                },
                willSendResponse(context) {
                    return __awaiter(this, void 0, void 0, function* () {
                        // console.log(context.response.body.singleResult) // response data
                        const receiveResponse = Date.now();
                        const elapsed = receiveResponse - requestStart;
                        console.log(`operation=${op} duration=${elapsed}ms`);
                        // Getting projectId from context object
                        const { id } = context.contextValue.projectId;
                        const query_string = context.request.query;
                        // construct a fake response for now
                        const fakeResponse = {
                            query_string: query_string,
                            execution_time: elapsed,
                            success: true,
                            operation_name: op
                        };
                        // This insert metrics to Kensa database
                        yield (0, exports.insertMetrics)(fakeResponse, id);
                    });
                }
            };
        });
    }
};
//# sourceMappingURL=index.js.map