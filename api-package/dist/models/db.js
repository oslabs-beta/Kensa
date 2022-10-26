"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
const PG_URI = 'postgres://cinamzyi:JX38bpVpO5jpxFDtUM3fc0qvBBuSkbqB@peanut.db.elephantsql.com/cinamzyi';
const pool = new pg_1.Pool({
    connectionString: PG_URI
});
const query = (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
};
exports.query = query;
//# sourceMappingURL=db.js.map