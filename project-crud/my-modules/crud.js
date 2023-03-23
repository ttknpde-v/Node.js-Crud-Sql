
    const ConfigDatabase = require('../config-database/configuration');
    const ClassConfigDB = new ConfigDatabase(); /* get Class */
    const connect = ClassConfigDB.getConnectDatabase();
    const application = ClassConfigDB.getApplication();
    /** same there -> const application =  return application(); */
    const express = ClassConfigDB.getExpress(); /* we need for set middleware to be Json format */



    class Crud {
         #directSql = {
             insertInto: `INSERT INTO contact (nickname,email,phone) VALUES (?,?,?) ;`,
             selectAll: "SELECT * FROM contact ORDER BY id DESC ;",
             selectJustOne: "SELECT * FROM contact WHERE id = ? ;",
             updateInfo:"UPDATE contact SET nickname = ? , email = ? , phone = ? WHERE id = ? ;",
             deleteByName:"DELETE FROM contact WHERE nickname = ?;",
         }

        #setInsert() {
             const insertInto = this.#directSql.insertInto;
             application.use(express.json());
             /* we need
             *  in this case if you don't set information Json
             *  application.use(express.json())
             *  time to insert on body Postman value is null !!!
             *  แปลงข้อมูล Json Object ให้เป็น Js Object (ข้อมูลยังไม่ถูกแปลงเป็น Object การ add ข้อมูลผ่าน Postman จึงเป็น Null )
             *  */
             application.post('/api/create' , function (req, res) {
                let { nickname ,email , phone} = req.body;
                connect.query(insertInto, [nickname,email,phone] ,function (err, result) {

                    if(err) {
                        console.log('somethings wrong '+err.message);
                    }
                    else {
                        console.log(result);
                        return res.json({mess:"insert employee successfully"});
                    }

                }); /* query */
            }); /* set url */

            application.listen(3000 , function () {
                console.log('you are in port 3000');
            });
        }

        get insert() {
             this.#setInsert();
        }

        #setDeleteByName() {
            const deleteByName = this.#directSql.deleteByName;
            application.use(express.json());
            /* do not forget -> change json object to js object */
            application.delete('/api/delete' , function (req, res) {
                /* value is null because you don't use PUT !*/
                let {nickname } = req.body;
                connect.query(deleteByName,[nickname] , function (err , result) {
                    if(err) {
                        console.log('somethings wrong '+err.message);
                    }
                    else {
                        console.log(result);
                        return res.json({mess:"delete employee successfully"});
                    }
                });
            });

            application.listen(3000 , function () {
                console.log('you are in port 3000');
            });
        } /* getDeleteByNam */

        get deleteByName() {
            this.#setDeleteByName();
        }

        #setReadAll() {
            const selectAll = this.#directSql.selectAll;
            application.get('/api/read' , function (req, res) {

                connect.query(selectAll ,function (err, result) {

                    if(err) {
                        console.log('somethings wrong '+err.message);
                    }

                    else if(result === undefined || result.length == 0) {
                        return res.json({mes:'empty information'})
                    }
                    else {
                        console.log(result);
                        return res.json({employee:result});
                        /* return json object */
                    }

                }); /* query */
            }); /* set url */

            application.listen(3000 , function () {
                console.log('you are in port 3000');
            });
        } /* getReadAll */

        get readAll() {
            this.#setReadAll();
        }

        #setReadById() {
            const selectJustOne = this.#directSql.selectJustOne;
            application.get('/api/:id' , function (req, res) {
                let id = req.params.id; /* [req.params] get value from url (GET) to variable */
                connect.query(selectJustOne , [id] , function (err, result) {
                    if (err) {
                        console.log('somethings wrong '+err.message);
                    }
                    else if(result === undefined || result.length == 0) {
                        return res.json({mes:'empty information'})
                    }
                    else {
                        console.log(result);
                        return res.json({employee:result});
                    }

                }); /* query */
            }); /* set url */

            application.listen(3000 , function () {
                console.log('you are in port 3000');
            });
        } /* getReadById */

        get readById() {
            this.#setReadById();
        }

        #setUpdate() {
            const updateInfo = this.#directSql.updateInfo;
            application.use(express.json()); /* change json object to js object */
            application.put('/api/update' , function (req, res) {
                /* value is null because you don't use PUT !*/
                let {nickname , email , phone , id } = req.body;
                connect.query(updateInfo,[nickname,email,phone , id] , function (err , result) {
                    if(err) {
                        console.log('somethings wrong '+err.message);
                    }
                    else {
                        console.log(result);
                        return res.json({mess:"update employee successfully"});
                    }
                });
            });

            application.listen(3000 , function () {
                console.log('you are in port 3000');
            });
        } /* getUpdate */

        get update() {
            this.#setUpdate();
        }

    }

    module.exports = Crud;

/*
    const ClassCrud = new Crud();
    ClassCrud.getReadAll();
    ClassCrud.getUpdate();
    ClassCrud.getDeleteByName();
*/
