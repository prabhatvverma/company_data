const user = require("../model/user");
const { param } = require("../routes");
const fs = require('fs');
const { query } = require("express");
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
     * Show create form page
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
     * @param {*} next
    */
    async registration(req, res, next) {
        res.render('user/registration', {
            title: 'Express user'
        });
    }
    async storeLoginDetails(req, res, next) {
        const { username, email, password } = req.body;
        console.log(req.body);
        const re = await user.registration(username, email, password);
        var rows = await user.getAllLogin();
        res.render('user/test', {
            title: 'Express users',
            rows: rows
        });
    }
    /**
     * for storing data
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async store(req, res, next) {
        const { uuid, first_name, last_name, father_name, email, phone_no, gender, hobbies, state, district } = req.body;
        var file = req.files.img_file;
        var filename = file.name;
        var dateTime = Date.now();
        var file_name = dateTime + filename;
        file.mv('./public/images/' + file_name);
        const re = await user.create(uuid, first_name, last_name, father_name, email, phone_no, gender, hobbies, state, district, file_name);
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
        let hobbies = [rows[0].hobbies];
        console.log(hobbies);
        res.render('user/edit', {
            title: 'Express user',
            rows: rows,
            hobbies: hobbies,
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
        var file = req.files.img_file;
        var filename = file.name;
        var dateTime = Date.now();
        var file_name = dateTime + filename;
        file.mv('./public/images/' + file_name);
        const { uuid, first_name, last_name, father_name, email, phone_no, gender, hobbies, state, district } = req.body;
        let { id } = req.params;
        await user.updateDatabyId(id, uuid, first_name, last_name, father_name, email, phone_no, gender, hobbies, state, district, file_name);
        res.redirect('/users');
    }

    /**
     * Deleting data from database
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async delete(req, res, next) {
        let { id } = req.params;
        await user.deleteDatabyid(id);
        res.redirect('/users');
    }
}

module.exports = new UsersController;