const user = require("../model/user");
// const user = require("../model/user");
const { param } = require("../routes");
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
   async login(req, res, next) {
       res.render('user/login', {
           title: 'Express user'
        });
    }
    
    async store(req, res, next) {
        const { uuid, first_name, last_name, father_name, email, phone_no, gender, state, district } = req.body;
        // console.log(uuid, first_name, last_name, father_name, email, phone_no, gender, state, district);
        // console.log(req.body);
        // console.log(uuid, "==============");
        const re = await user.create(uuid, first_name, last_name, father_name, email, phone_no, gender, state, district);
        // console.log("res", re);
        var rows = await user.getAll();
    //    console.log("rows", rows);
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
       console.log(typeof(id));
    //    temp=id;
    //    console.log("------------->"+id);
       
    //    console.log("=======" + id);
       // return false;
       var rows = await user.getDatabyId(id);
       res.render('user/edit', {
            title: 'Express user',
            rows: rows,
            id
        });
    }

    async update(req, res, next){
        console.log("hello");
        console.log("hello iam there",typeof(req.body.first_name));
        
        // return false; 
        const { uuid, first_name, last_name, father_name, email, phone_no, gender, state, district } = req.body;
        let{id} = req.params;
        
        await user.updateDatabyId(id,uuid, first_name, last_name, father_name, email, phone_no, gender, state, district );
        res.redirect('/users');
    }

    async delete (req ,res, next){
        let {id}= req.params;
        // console.log("_____________"+id);
        await user.deleteDatabyid(id);
        res.redirect('/users');
    }
}

// module.exports = temp;
module.exports = new UsersController;