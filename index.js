// var app = require                                   
const express = require('express');
const execution = new express();
const bodyparser = require("body-parser");
const controller = require("./controller/userController");
const loginController = require("./controller/loginController");
const questionController = require("./controller/questionController");
const answerController = require("./controller/answerController");
const petController = require("./controller/petController");
const adoptController = require("./controller/adoptPetController");
var multer = require('multer');
var path = require('path');
execution.use(bodyparser.json());
execution.use(express.static(path.join(__dirname, "/upload")));



// var myupload = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "upload");
//     },
//     filename: function(req, file, cb) {
//         let fileExt = path.extname(file.originalname);
//         cb(null, Date.now() + '_' + file.originalname);
//         //   cb(null, file.originalname);
//     }
// });


// var upload = multer({
//     storage: myupload
// });


// var uploadRouter = express.Router();
// execution.post('/upload',upload.single('imgFile'), (req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json(req.file);
// });


///image upload
var myupload = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "upload");
    },
    filename: function(req, file, cb) {
        let fileExt = path.extname(file.originalname);
        cb(null, Date.now() + '_' + file.originalname);
        //   cb(null, file.originalname);
    }
});

var upload = multer({
    storage: myupload
});
var uploadimg = upload.single('user_image');
var petimg = upload.single('pet_image');



execution.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "content-type,X-Requested-With,authorization");
    next();
});

//user registration
execution.post('/v1/register',
    uploadimg,
    controller.validator,
    controller.pwdHash,
    controller.userregister,
    function(req, res, next) {
        console.log(req.body);
        // if any thing post then status should be 201.
        res.status(201);
        //message after successfully post
        res.send({ "message": "User successfully Registered" })

    });


execution.post('/v1/login', loginController.tokenGenerate,
    loginController.checkLogin,
    function(req, res) {
        // if any thing post then status should be 201.
        res.status(201);
        //message after successfully post
        res.json({
            "message": "Login successfully done",
            "usertoken": req.genToken,
            "username": req.uname,
            "type": req.type
        })

    });

execution.del('/v1/deleteuser/:uid', controller.userDelete);
execution.put('/v1/updateUser/:userid', controller.pwdHash, controller.userUpdate);

execution.get('/v1/select/:username', controller.selectByUsername);
execution.get('/v1/reteriveUser', controller.reteriveUserAll);
///user reistration end route

//addd pet detail
execution.post('/v1/addpet',petimg, petController.addPet, function(req, res) {
    // if any thing post then status should be 201.
    res.status(201);
    //message after successfully post
    res.json({ "message": "pet added" })

});

execution.get('/v1/getpet', petController.getPet, function(req, res) {
    console.log(req.body)
});
execution.get('/v1/getpet/:petid', petController.getPetById);

execution.del('/v1/pet/delete/:petid', petController.petDelete, function(req, res) {
    console.log(req.body)
});
execution.put('/v1/pet/update/:petid', petController.petUpdate, function(req, res) {
    console.log(req.body)
});

// ------------------------------------------
execution.post('/v1/quesion/add', questionController.postQuestion, function(req, res) {
    // if any thing post then status should be 201.
    res.status(201);
    //message after successfully post
    res.json({ "message": "question added" })

});

execution.del('/v1/question/delete/:qid', questionController.questionDelete);
execution.get('/v1/question', questionController.reteriveQuestion);

// -------------------------
//addd pet detail
execution.post('/v1/adoptPet', adoptController.adoptPetAdd, function(req, res) {
    // if any thing post then status should be 201.
    res.status(201);
    //message after successfully post
    res.json({ "message": "pet adopted" })

});

execution.get('/v1/getAdopt', adoptController.getAdoptedetail );

////////////////////
// execution.use(function(err, req, res, next) {

//     res.status(err.status);
//     res.send({ "message": err.message });


//     console.log(err.status);
//     console.log(err.message);
// })


execution.use((err, req, res, next) => {
    res.locals.error = err;
    if (err.status >= 100 && err.status < 600)
        res.status(err.status);
    else
        res.status(500);

    res.send({
        "message": err.message
    })
});


execution.listen(process.env.PORT || 5000, (req, res) => {
    try {
        console.log("port is running");
    } catch (error) {
        console.log("port is not running");
    }
});