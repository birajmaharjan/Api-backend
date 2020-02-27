var bookmodel = require("../model/adoptPetModel");

function adoptPetAdd(req, res, next) {
    console.log(req.body);
    bookmodel.petbook.create({
        adoptpetname: req.body.petname,
        adoptbreed: req.body.breed
        // type: req.body.pettype,
        // pet_image: req.body.petimage,
        // age: req.body.petage,
        // gender: req.body.petgender,
    }).then(function(result) {
        next();
    }).catch(function(err) {
        next({
            "status": 500,
            "message": "Could not adopt pet! "
        });
    });

}

function getAdoptedetail(req, res, next) {
    bookmodel.petbook.findAll({})
        .then(function(result) {
            res.json(result);
            next();
        })
        .catch(function(err) {
            console.log(err);
        });
};
//getting pet by id 
// function getAdopteDetail(req, res, next) {
//     bookmodel.petbook.findOne({
//         where: { id: req.params.id }
//     }).then(function(result) {
//         console.log(req.body);
//         res.status(200);
//         res.json(result);
//     }).catch(function(err) {
//         console.log(err);
//     })
// }


//delete user
function adoptCancel(req, res, next) {
    console.log(req.params.id);
    bookmodel.petbook.destroy({
        where: { uiidd: req.params.id }
    }).then(function() {
        res.status(201);
        res.send({ " Message": "booking Deleted" })
    }).catch(function(err) {
        next({ status: 500, "message": " not deleted" });
    });
}


function adoptUpdate(req, res, next) {
    console.log(req.params.id);
    var pet = {
        petname: req.body.petname,
        breed: req.body.petbreed,
        type: req.body.pettype,
        pet_image: req.body.petimage,
        age: req.body.petage,
        gender: req.body.petgender
    }

    bookmodel.petbook.update(pet, { where: { id: req.params.id } })
        .then(function(result) {
            res.status(201);
            res.send({ message: "Booking Updated Successfully" });
            next();
        }).catch(function(err) {
            console.log(err);
            next({
                "status": 500,
                "message": "not updated "
            });
        })

}

module.exports = { adoptPetAdd, adoptUpdate, getAdoptedetail, adoptCancel }