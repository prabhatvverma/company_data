const db = require("../config/db");
class User {

    async create(uuid, first_name, last_name, father_name, email, phone_no, gender, state, district,file_name) {
        // String(file_db);
        var sql = "INSERT INTO users_data(uuid, first_name, last_name, father_name, email,phone_no,gender,state,district, img_file) VALUES(?)";
        var values = [uuid, first_name, last_name, father_name, email, phone_no, gender, state, district,file_name];
        db.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }


    getAll() {
        return new Promise((res, rej) => {
            db.query("SELECT * FROM users_data", (err, result, fields) => {
                if (err) {
                    rej(err);
                }
                res(result);
            });
        })
    }

    getDatabyId(temp) {
        return new Promise((res, rej) => {
            db.query("SELECT * FROM users_data WHERE id = " + temp, function (err, result) {
                if (err) {
                    throw err;
                }
                res(result);
            });
        })
    }

    updateDatabyId(temp, uuid, first_name, last_name, father_name, email, phone_no, gender, state, district) {
        var sql = `UPDATE users_data SET uuid = ${uuid} , first_name ="${first_name}" ,last_name="${last_name}",father_name="${father_name}",email="${email}",phone_no=${phone_no},gender="${gender}",state="${state}",district="${district}" WHERE id = ${temp}`;
        return new Promise((res, rej) => {
            db.query(sql, function (err, result) {
                if (err) {
                    throw err;
                }
                res(result);
            });
        })

    }

    deleteDatabyid(temp) {
        return new Promise((res, rej) => {
            db.query("DELETE FROM users_data WHERE id = " + temp, function (err, result) {
                if (err) {
                    throw err;
                }
                res(result);
            });
        })

    }
}


module.exports = new User;