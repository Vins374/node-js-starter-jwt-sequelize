const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const validator = require('express-validator')
const { check, validationResult } = require('express-validator/check');
const User = require('../models/user.model.js');

// Create and Save a new Note
exports.create = async (req, res) => {
    var errors = module.exports.createUserValidate(req);
    if(errors) 
        return res.status(202).send({status:false,message: errors});  
        
        var user = await User.findOne({ where:{email:req.body.email}}).catch((err)=>{ res.send(err) })
        
        if(user) {
            return res.status(200).send({status:false,message: "Email id already taken"});   
        }

        var result = await User.create({ name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password,10) }).catch((err)=>{ res.send(err) });
        res.send({status:true, message: "user created successfully", result:result});
};

exports.login = async (req, res) => {
    req.check('email', 'Email is required').notEmpty();
    req.check('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();
    if(errors) 
        return res.status(202).send({status:false,message: errors});

    var user = await User.findOne({ where:{email:req.body.email}}).catch((err)=>{ res.send(err) })  

    if(!user)
        return res.status(200).send({status:false,message: "Invalid email and password"});   

    console.log(user.password);

    bcrypt.compare(req.body.password, user.password, function(err, response) {
        if(response == true){
            var token = jwt.sign(user.toJSON(), 'mysql_app_secret');
            return res.status(200).send({status:true,message: "Login success", token: token});   
        }
        else 
            return res.status(200).send({status:false,message: "Invalid password"});   
    });

};

exports.get = async (req, res) => {
    var user = await User.findOne({ attributes:{exclude: ['password']}, where:{email:req.body.email}}).catch((err)=>{ res.send(err) })  

    if(user)
        return res.status(200).send({status:true, data:user, message: "User details found"});   
    else 
        return res.status(200).send({status:false,message: "User details not found"});   
};

function testFunction(result,res){
    console.log("coming here to test function");
    res.send({ status: true, message: "User registration success.", result: result });
}

exports.createUserValidate = (req) => {
    // validate the input
    req.check('name', 'Password is required').notEmpty();
    req.check('email', 'Fullname is required').notEmpty();
    req.check('password', 'Username is required').notEmpty();

    // check the validation object for errors
    var errors = req.validationErrors();
    return errors;
};
