"use strict";
exports.__esModule = true;
exports.query = void 0;
var pg_1 = require("pg");
var PG_URI = 'postgres://cinamzyi:JX38bpVpO5jpxFDtUM3fc0qvBBuSkbqB@peanut.db.elephantsql.com/cinamzyi';
var pool = new pg_1.Pool({
    connectionString: PG_URI
});
var query = function (text, params, callback) {
    console.log('executed query', text);
    return pool.query(text, params, callback);
};
exports.query = query;
