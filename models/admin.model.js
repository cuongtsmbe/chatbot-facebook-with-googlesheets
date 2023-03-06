const db = require('../util/db');
const TABLE="admin";

module.exports={
    getOne:function(condition){
        return db.load(`select username,password from ${TABLE} WHERE ?`,condition);
    }
}