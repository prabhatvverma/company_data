const user = require("../model/user");
// const user = require("../model/user");
const { param } = require("../routes");
const fs = require('fs');
const { query } = require("express");
// let temp = {};
class UsersController {

    /**
     * Show users data page
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
    */
    async index(req, res, next) {
        var rows = await user.getAll();
        //    console.log("rows", rows);
        res.render('user/index', {
            title: 'Express users',
            rows: rows
        });
    }

    /**
     * show create form page
     * @param {*} req
     * @param {*} res
     * @param {*} next
    */
    async create(req, res, next) {
        res.render('user/create', {
            title: 'Express users'
        });
    }

    /**
     * show login page
     * @param {*} req
     * @paralet { id } = req.params;
       console.log("------------->"+id);m {*} res
     * @param {*} next
    */
    async registration(req, res, next) {
        res.render('user/registration', {
            title: 'Express user'
        });
    }

    /**
     * for storing data
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async store(req, res, next){
        const { uuid, first_name, last_name, father_name, email, phone_no, gender, state, district, img_file } = req.body;
        // console.log(uuid, first_name, last_name, father_name, email, phone_no, gender, state, district);
        // console.log(req.body);
        // console.log(req.files.img_file);
        var file = req.files.img_file;
        var filename = file.name;
        var dateTime = Date.now();
        var file_name = dateTime + filename;
        file.mv('./public/images/' + file_name);
        const re = await user.create(uuid, first_name, last_name, father_name, email, phone_no, gender, state, district, file_name);
        var rows = await user.getAll();
        res.render('user/index', {
            title: 'Express users',
            rows: rows
        });
    }

    /**
     * Show edit page
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
    */

    async edit(req, res, next) {
        let { id } = req.params;
        var rows = await user.getDatabyId(id);
        // console.log(rows.id,"++++++++");
        // return false;
        res.render('user/edit', {
            title: 'Express user',
            rows: rows,
            id
        });
    }
/**
 * for updation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async update(req, res, next) {
    // console.log("hello");
    // console.log("hello iam there",typeof(req.body.first_name));

    // return false; 
    var file = req.files.img_file;
    var filename = file.name;
    var dateTime = Date.now();
    var file_name = dateTime + filename;
    file.mv('./public/images/' + file_name);
    const { uuid, first_name, last_name, father_name, email, phone_no, gender, state, district} = req.body;
    console.log(req.body);
    let { id } = req.params;

    await user.updateDatabyId(id, uuid, first_name, last_name, father_name, email, phone_no, gender, state, district, file_name);
    res.redirect('/users');
}

    /**
     * for deletion 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async delete(req, res, next) {
        let { id } = req.params;

        // fs.unlink('./public/images/1759790.jpg',(err => {
        //     if (err) console.log(err);}));
        // console.log("_____________"+id);
        await user.deleteDatabyid(id);
        
        // const filenamedl= get.image.split("/images/")
        // fs.unlink('public/images/',file,(err => {
        //     if (err) console.log(err);}));
        // fs.unlink('images/${img_file}',()=>{});
        res.redirect('/users');
    }
}

// module.exports = temp;
module.exports = new UsersController;        