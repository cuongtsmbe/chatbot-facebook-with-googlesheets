const mysql = require('mysql');
const configMysql = require("../config/mysql");


module.exports = {
    load: function(sql,condition) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(configMysql.json());
            connection.connect();
            connection.query(sql,condition, function(error, results, fields) {
                if (error) {
                    console.log(error); 
                    return resolve([]);
                };
                
                try{
                    results = dbMdw.resultsFormatTime(results);
                }catch(err){
                    //console.log("RUN UPDATE OR ....");
                }
                resolve(results);
            });
            connection.end();
        });
    },
    get: function(table,limit,offset) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(configMysql.json());
            connection.connect();
            connection.query(`SELECT * from ${table} LIMIT ? OFFSET ?`,[limit,offset], function(error, results, fields) {
                if (error) {
                    console.log(error); 
                    return resolve([]);
                };

                try{
                    results = dbMdw.resultsFormatTime(results);
                }catch(err){
                    //console.log("RUN UPDATE OR ....");
                }

                resolve(results);
            });

            connection.end();
        });
    },
    insert: function(table, data) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(configMysql.json());
            connection.connect();
            connection.query(`INSERT INTO ${table} SET ?`, data, function(error, results, fields) {
                if (error) {
                    console.log(error); 
                    return resolve([]);
                };
                resolve(results);
            });

            connection.end();
        });
    },
    getOneByCondition: function(table, condition) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(configMysql.json());
            connection.connect();
            connection.query(`select * from ${table} where ?`, condition, function(error, results, fields) {
                if (error) {
                    console.log(error); 
                    return resolve([]);
                };

                try{
                    results = dbMdw.resultsFormatTime(results);
                }catch(err){
                    //console.log("RUN UPDATE OR ....");
                }
                
                resolve(results);
            });

            connection.end();
        });
    },
    delete: function(table, con) {
        return new Promise(function(resolve, reject) {
            var connection = mysql.createConnection(configMysql.json());
            connection.connect();
            connection.query(`DELETE FROM ${table} WHERE ?`, con, function(error, results, fields) {
                if (error) {
                    console.log(error); 
                    return resolve([]);
                };
                resolve(results);
            });

            connection.end();
        });
    },


};