const db = require('../util/db');
const TABLE="user";

module.exports={
    //get user by fnpage ID
    getOneByFBID:function(condition){
        return db.load(`SELECT * from ${TABLE} WHERE fanpage_id=?`,condition.fanpage_id);
    },
    //get all user
    getAll:function(){
        var result   = db.load(`select * from ${TABLE}`);
        return result;
    },
    //count all user
    countAll:function(){
        var result;
        result   = db.load(`select count(*) as count from ${TABLE} `);
        return result;
    },
    //get list by condition limit,offset
    getList: function(condition){
        var result;
        result   = db.get(TABLE,condition.limit,condition.offset);
        return result;
    },
    //add new 
    add:function(value){
        return db.insert(TABLE,value);
    },
    //update by fanpage_id
    update:function(condition,value){
        return db.load(`UPDATE ${TABLE} SET ? WHERE fanpage_id=${condition.fanpage_id}`,value);
    },
    //delete by condition fanpage_id
    delete:function(condition){
        return db.delete(TABLE,condition);
    }
}