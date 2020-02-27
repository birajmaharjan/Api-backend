var petmodel = require("../model/petModel");



function addPet(req, res, next) {
    console.log(req.body);
    petmodel.Pet.create({
            petname: req.body.petname,
            breed: req.body.petbreed,
            type: req.body.pettype,
            pet_image: req.file.filename,
            age: req.body.petage,
            gender: req.body.petgender,
        })
        .then(function(result) {
            next();
        })
        .catch(function(err) {
            next({
                "status": 500,
                "message": "Could not Register pet! "
            });
        });

}

function getPet(req, res, next) {
    petmodel.Pet.findAll({})
        .then(function(result) {
            res.json(result);
            next();
        })
        .catch(function(err) {
            console.log(err);
        });
};
//getting pet by id 
function getPetById(req, res, next) {
    petmodel.Pet.findOne({
        where: { id: req.params.petid }
    }).then(function(result) {
        console.log(req.body);
        res.status(200);
        res.json(result);
    }).catch(function(err) {
        console.log(err);
    })
}


//delete user
function petDelete(req, res, next) {
    console.log(req.params.petid);
    petmodel.Pet.destroy({
        where: { id: req.params.petid }
    }).then(function() {
        res.status(201);
        res.send({ " Message": "Pet Deleted" })
    }).catch(function(err) {
        next({ status: 500, "message": " not deleted" });
    });
}


function petUpdate(req, res, next) {
    console.log(req.params.petid);
    var pet = {
        petname: req.body.petname,
        breed: req.body.petbreed,
        type: req.body.pettype,
        // pet_image: req.file.filename,
        age: req.body.petage,
        gender: req.body.petgender
    }

    petmodel.Pet.update(pet, { where: { id: req.params.petid } })
        .then(function(result) {
            res.status(201);
            res.send({ message: "Pet Updated Successfully" });
            next();
        }).catch(function(err) {
            console.log(err);
            next({
                "status": 500,
                "message": "not updated "
            });
        })

}


module.exports = { petDelete, petUpdate, addPet, getPet, getPetById }