var usermodel = require("../model/userModel");
var Bcrypt = require("bcryptjs");


// validator
function validator(req, res, next) {
    // console.log(req.body);

    console.log(req.body.username)
    usermodel.User.findOne({
            where: { username: req.body.username }
        })
        .then(function(result) {
            console.log(result.dataValues);
            if (result.dataValues != '') {
                next({ "status": 409, "message": 'User already exists' })
            }
        })
        .catch(function(err) {
            next();
        })
}

function reteriveUserAll(req, res, next) {

    console.log(req.body.username)
    usermodel.User.findAll({})
        .then(function(result) {
            console.log(result.dataValues);
            if (result.dataValues != '') {
                res.json(result);
            }
        })
        .catch(function(err) {
            next({ "status": 409, "message": 'User noot exists' })
        })
}

function selectByUsername(req, res, next) {
    console.log(req.params.username);
    usermodel.User.findOne({
        where: { username: req.params.username }
    }).then(function(result) {
        res.status(201);
        res.json(result);
    }).catch(function(err) {
        next({ status: 500, "message": " not selected" });
    });
}

//delete user
function userDelete(req, res, next) {
    console.log(req.params.uid);
    usermodel.User.destroy({
        where: { id: req.params.uid }
    }).then(function() {
        res.status(201);
        res.send({ " Message": "User Deleted" })
    }).catch(function(err) {
        next({ status: 500, "message": " not deleted" });
    });
}


function userUpdate(req, res, next) {
    console.log(req.params.userid);
    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email_address: req.body.email_address,
        address: req.body.address,
        username: req.body.username,
        password: req.myhash,
        type: req.body.type
    }

    usermodel.User.update(user, { where: { id: req.params.userid } })
        .then(function(result) {
            res.status(201);
            res.send({ message: "Updated Successfully" });
            next();
        }).catch(function(err) {
            console.log(err);
            next({
                "status": 500,
                "message": "not updated "
            });
        })

}

function userregister(req, res, next) {
    console.log(req.body);
    usermodel.User
        .create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email_address: req.body.email_address,
            address: req.body.address,
            user_image: req.file.filename,
            username: req.body.username,
            password: req.myhash, //auto
            type: 'user'
        })
        .then(function(result) {
            next();
        })
        .catch(function(err) {
            console.log(err);
            next({
                "status": 500,
                "message": "Could not Register User, Database Error ! "
            });
        });

}


function pwdHash(req, res, next) {
    console.log(req.body.password);
    Bcrypt.hash(req.body.password, 10)
        .then(function(hash) {
            req.myhash = hash;
            console.log(hash);
            next();
        })
        .catch(function(err) {
            // next();
            console.log(err);
        });
};

module.exports = { selectByUsername, userDelete, userUpdate, reteriveUserAll, validator, userregister, pwdHash }