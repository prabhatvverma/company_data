const db = require("../config/db");
const fs = require('fs');
const { json } = require("express");
const { param } = require("../routes");
class User {
//adding data to database
    async create(uuid, first_name, last_name, father_name, email, phone_no, gender,hobbies, state, district,file_name) {
        var sql = "INSERT INTO users_data(uuid, first_name, last_name, father_name, email,phone_no,gender,hobbies,state,district, img_file) VALUES(?)";
        var hobbi = hobbies.toString();
        var values = [uuid, first_name, last_name, father_name, email, phone_no, gender,hobbi, state, district,file_name];
        db.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }

//get all the data from db 
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
// get data from table behalf of id
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
//updating data in database
updateDatabyId(temp, uuid, first_name, last_name, father_name, email, phone_no, gender,hobbies, state, district,file_name) 
{   
    // console.log(hobbies);
    // return false;
    // console.log(temp,"new things");
    var sql = `UPDATE users_data SET uuid = "${uuid}" , first_name ="${first_name}" ,last_name="${last_name}",father_name="${father_name}",email="${email}",phone_no=${phone_no},gender="${gender}",hobbies="${hobbies}",state="${state}",district="${district}", img_file="${file_name}" WHERE id = ${temp}`;

    return new Promise((res, rej) => {
        db.query(sql, function (err, result) {
            if (err) {
                throw err;
            }
            res(result);
        });
    })

}
//deleting data from data base as well as deleting file from folder
    async deleteDatabyid(temp) {

        var row = await this.getDatabyId(temp);
        // console.log("row", row[0].first_name);  
        var delimg = row[0].img_file;
        return new Promise((res, rej) => {
            db.query("DELETE FROM users_data WHERE id = " + temp, function (err, result) {
                if (err) {
                    throw err;
                }
                fs.unlink('public/images/'+delimg,(err => {
                    if (err) console.log(err);}));
                res(result);
            });
        })

    }
}


module.exports = new User;