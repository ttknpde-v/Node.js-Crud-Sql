
    const ConfigServer = require('../config-server/configurationserver');
    class Configuration extends ConfigServer {
        /* this Configuration class can use any method on ConfigServer */
        #privateDB = { /* private attribute */
            /* in js using (#) for private */
            host:"127.0.0.1" ,
            username:"***" ,
            password:"***",
            port:"3307" ,
            dataName:"***"
        }

        get #getModuleMysSql () { /* private method */
             const mysql = require('mysql'); /* load modules for connect Mysql */
             return mysql;
        }

        checkConnect (connect) {
            connect.connect(function (errors) {
                if (errors) {
                    console.log('connect database failed...'+errors.message);
                }
                else {
                    console.log('connect success...');
                    /*return connect;*/
                }
            });
        }



        getConnectDatabase() {

            const connection = this.#getModuleMysSql.createConnection({
               host:this.#privateDB.host ,
               user:this.#privateDB.username ,
               password:this.#privateDB.password ,
               port:this.#privateDB.port ,
               database:this.#privateDB.dataName
               /* left is syntax
               *  you must write some default
               *  host:...
               *  user:...
               *  password:...
               *  database:... */
            });

             this.checkConnect(connection);
             /* if you return this method js will tell
             *  Cannot read Property 'query' of Undefined */

             return connection;

        } /* get connect database */

    }

    module.exports = Configuration; /* exports Configuration class */
/*
    test :)
    const TestConnect = new Configuration();
    TestConnect.getConnectDatabase();
*/
