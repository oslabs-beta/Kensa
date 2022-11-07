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
exports.getContext = exports.testPlugin = exports.insertMetricsDev = exports.insertMetrics = exports.getProjectId = void 0;
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
const insertMetricsDev = (response, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    // cosnt { project_id } = GraphQL context object
    const { query_string, execution_time, success, operation_name } = response;
    const result = yield (0, db_1.query)('INSERT INTO history_log_dev(query_string, project_id, execution_time, success, operation_name) VALUES($1, $2, $3, $4, $5) RETURNING *;', [query_string, projectId, execution_time, success, operation_name]);
    console.log(result.rows[0]);
    return result.rows[0];
});
exports.insertMetricsDev = insertMetricsDev;
exports.testPlugin = {
    // Fires whenever a GraphQL request is received from a client. This plugin runs after whatever happens in ApolloServer's context
    requestDidStart(requestContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // IntrospectionQuery keeps running in GraphQL server. Use this condition to stop context from logging for IntrospectionQuery
            if (requestContext.request.operationName === 'IntrospectionQuery')
                return;
            // Query string request sent by the client
            // console.log(`Request started! Query: ${requestContext.request.query}`)
            // console.log(`Request variable! Variable: ${requestContext.request.variables}`)
            const requestStart = Date.now();
            let op;
            let success = true;
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
                didEncounterErrors() {
                    return __awaiter(this, void 0, void 0, function* () {
                        success = false;
                    });
                },
                willSendResponse(context) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const receiveResponse = Date.now();
                        const elapsed = receiveResponse - requestStart;
                        console.log(`operation=${op} duration=${elapsed}ms`);
                        op = context.request.operationName;
                        // Getting projectId from context object
                        const { id } = context.contextValue.projectId;
                        const query_string = context.request.query;
                        // construct an object with metrics
                        const metricBody = {
                            query_string: query_string,
                            execution_time: elapsed,
                            success: success,
                            operation_name: op
                        };
                        // This insert metrics to Kensa database
                        yield (0, exports.insertMetrics)(metricBody, id);
                    });
                }
            };
        });
    }
};
const getContext = ({ req, res }, api, db) => __awaiter(void 0, void 0, void 0, function* () {
    // IntrospectionQuery keeps running. Use this to stop context from logging for IntrospectionQuery
    if (req.body.operationName === 'IntrospectionQuery')
        return;
    // Calling npm package to get projectId
    const projectId = yield (0, exports.getProjectId)(api);
    // returning context object
    return {
        req,
        res,
        db,
        projectId
    };
});
exports.getContext = getContext;
//# sourceMappingURL=index.js.map