var mysql = require('mysql');

class DbConnect {
    constructor(){
        this.connectPool = mysql.createPool({
            connectionLimit: 50,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'db_mybitboxmining'
        });
        //Minemart@1234567
    }

    // format string
    queryFormat (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {
            if (values.hasOwnProperty(key)) {
                return "'" + values[key] + "'";
            }
            return txt;
        });
    };

    // insert
    createQueryInsert (table, object) {
        var query = 'insert into ' + table + '(';
        var endquerry = 'values(';

        for(var item in object) {
            query += item + ', ';
            endquerry += ':' + item + ', ';
        }

        return query.substr(0, query.length-2) + ') ' + endquerry.substr(0, endquerry.length-2) + ')';
    }

    // get connect
    getConnect(){
        this.connectPool.getConnection(function(err, connection){
            if (err) {
                throw err;
            }
            return connection;
        });
    }

    // select data
    Doquery (query, objData) {
        query = this.queryFormat(query, objData);
        console.log(query);
        return new Promise((resolve, reject) => {
            this.connectPool.getConnection(function(err, connection){
                if (err) {
                    reject(new Error(err));
                }
                else {
                    connection.query(query, function (error, results, fields) {
                        connection.release();
                        if (error) {
                            reject(new Error(error));
                        }
                        else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }

    // insert data
    /*ExcuteInsert(tableName, objData) {
        var query = this.queryFormat(query, objData);
        return new Promise((resolve, reject) => {
            this.connectPool.getConnection(function(err, connection){
                if (err) {
                    reject(new Error(err));
                }
                else {
                    connection.query(query, function (error, results, fields) {
                        connection.release();
                        if (err) {
                            reject(new Error(err));
                        }
                        else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }*/

    ExcuteInsert(query, objData) {
        query = this.queryFormat(query, objData);
        return new Promise((resolve, reject) => {
            this.connectPool.getConnection(function(err, connection){
                if (err) {
                    logFile.writeLogFile('getConnection', __filename, 105 ,err);
                    reject(new Error(err));
                }
                else {
                    connection.query(query, function (error, results, fields) {
                        connection.release();
                        if (error) {
                            logFile.writeLogFile('ExcuteInsert', __filename, 113 ,error);
                            logFile.writeLogFile('ExcuteInsert_SQL', __filename, 114 ,query);
                            reject(new Error(error));
                        }
                        else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }

    // update data
    ExcuteUpdate(query, objData) {
        query = this.queryFormat(query, objData);
        return new Promise((resolve, reject) => {
            this.connectPool.getConnection(function(err, connection){
                if (err) {
                    logFile.writeLogFile('getConnection', __filename, 131 ,error);
                    reject(new Error(err));
                }
                else {
                    connection.query(query, function (error, results, fields) {
                        connection.release();
                        if (error) {
                            logFile.writeLogFile('ExcuteUpdate', __filename, 138 ,error);
                            logFile.writeLogFile('ExcuteInsert_SQL', __filename, 139 ,query);
                            reject(new Error(error));
                        }
                        else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }

    // delete dataaffectedRows
    ExcuteDelete(query, objData) {
        query = this.queryFormat(query, objData);
        return new Promise((resolve, reject) => {
            this.connectPool.getConnection(function(err, connection){
                if (err) {
                    logFile.writeLogFile('getConnection', __filename, 157 ,err);
                    reject(new Error(err));
                }
                else {
                    connection.query(query, function (error, results, fields) {
                        connection.release();
                        if (error) {
                            logFile.writeLogFile('ExcuteDelete', __filename, 164 ,error);
                            logFile.writeLogFile('ExcuteDelete_SQL', __filename, 165 ,query);
                            reject(new Error(error));
                        }
                        else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }
}

module.exports = DbConnect;