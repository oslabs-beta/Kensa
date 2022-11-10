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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kensaPlugin = exports.insertMetricsDev = exports.insertMetrics = exports.getProjectId = exports.getContext = void 0;
const axios_1 = __importDefault(require("axios"));
const getContext = ({ req, res }, api, db) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.operationName === 'IntrospectionQuery')
        return;
    const projectId = yield (0, exports.getProjectId)(api);
    return {
        req,
        res,
        db,
        projectId
    };
});
exports.getContext = getContext;
const getProjectId = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post('http://localhost:3000/getId', { apiKey });
    return res.data.id;
});
exports.getProjectId = getProjectId;
// Collect metrics for GraphQL production operations
const insertMetrics = (response, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const { query_string, execution_time, success, operation_name } = response;
    yield axios_1.default.post('http://localhost:3000/metrics', {
        projectId,
        query_string,
        operation_name,
        execution_time,
        success
    });
});
exports.insertMetrics = insertMetrics;
// Collect metrics for GraphQL development operations
const insertMetricsDev = (response, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const { query_string, execution_time, success, operation_name } = response;
    yield axios_1.default.post('http://localhost:3000/devmetrics', {
        projectId,
        query_string,
        operation_name,
        execution_time,
        success
    });
});
exports.insertMetricsDev = insertMetricsDev;
exports.kensaPlugin = {
    requestDidStart(requestContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (requestContext.request.operationName === 'IntrospectionQuery')
                return;
            const headers = requestContext.contextValue.res.req.rawHeaders;
            const devmode = headers[headers.indexOf('Devmode') + 1];
            const requestStart = Date.now();
            let op;
            let success = true;
            return {
                didEncounterErrors() {
                    return __awaiter(this, void 0, void 0, function* () {
                        success = false;
                    });
                },
                willSendResponse(context) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const receiveResponse = Date.now();
                        const elapsed = receiveResponse - requestStart;
                        op = context.request.operationName;
                        if (!op) {
                            const queryStr = context.request.query;
                            let operationName = queryStr.substring(queryStr.indexOf(' '), queryStr.indexOf('{')).trim();
                            if (operationName.length < 1) {
                                operationName = 'Null';
                            }
                            op = operationName;
                        }
                        // Getting projectId from context object
                        const id = context.contextValue.projectId;
                        const query_string = context.request.query;
                        // construct an object with metrics
                        const metricBody = {
                            query_string: query_string,
                            execution_time: elapsed,
                            success: success,
                            operation_name: op
                        };
                        // check for dev mode
                        if (devmode === 'true') {
                            // insert metrics to Kensa database dev table
                            yield (0, exports.insertMetricsDev)(metricBody, id);
                        }
                        else {
                            // insert metrics to Kensa database
                            yield (0, exports.insertMetrics)(metricBody, id);
                        }
                    });
                }
            };
        });
    }
};
//# sourceMappingURL=index.js.map