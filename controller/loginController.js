var usermodel = require("../model/userModel");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

function checkLogin(req, res, next) {
    console.log(req.body.username);
    usermodel.User.findOne({
            attributes: [
                'username',
                'password',
                'type'
            ],
            where: { username: req.body.username }
        }).then(function(result) {
            req.uname = result.dataValues.username;
            req.type = result.dataValues.type;
            if (result != null) {
                bcrypt.compare(req.body.password, result.dataValues.password, function(err, res) {
                    if (res) {
                        next();
                    } else {
                        next({ "status": 409, "message": "Credential didn't match" });
                    }
                });
            } else {
                next({ status: 409, message: "Credential didn't match" });
            }
        })
        .catch(function(err) {
            console.log(err);
            next({ status: 409, message: "Credential didn't match" });
        })
}
////////generate token//////////////////////
function tokenGenerate(req, res, next) {
    jwt.sign({
            username: req.body.username,
            accessLevel: 'superadmin'
        }, 'thisissecretkey', {
            expiresIn: "8d"
        },
        function(err, token) {
            if (err != null || undefined) {
                console.log(err)
                next({ "status": 401, "message": "Unauthorized token" })
            } else {
                req.genToken = token;
                next();
                // console.log(token)	
            }
        }
    )
}
/////token verify///////////////////
function vToken(req, res, next) {
    console.log(req.headers);
    if (req.headers.authorization == undefined) {
        next({ status: 500, message: 'no authorization header present' })
    } else {

        let token = req.headers.authorization.slice(7, req.headers.authorization.length)

        jwt.verify(token, 'thisissecretkey', function(err, decoded) {
            console.log(decoded);
            if (err != null) {
                next({ status: 500, message: err.message })
                console.log(err);
            } else {
                next();
            }
        })

    }
}
// ///////////////////
module.exports = {
    tokenGenerate,
    vToken,
    checkLogin
}