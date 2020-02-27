var am = require("../model/answerModel");

function reteriveAnswer(req, res, next) {
    am.answerModel.findAll({})
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

//delete user
function answerDelete(req, res, next) {
    console.log(req.body.qid);
    am.answerModel.destroy({
        where: { questionId: req.params.qid }
    }).then(function() {
        console.log("deleted")
        res.status(201);
        res.send({ " Message": "Answer Deleted" })
    }).catch(function(err) {
        console.log(err)
        next({ status: 500, "message": " not deleted" });
    });
}


function postAnswer(req, res, next) {
    console.log(req.body);
    am.answerModel
        .create({
            question: req.body.question,
            username: req.body.username
        })
        .then(function(result) {
            next();
        })
        .catch(function(err) {
            console.log(err);
            next({
                "status": 500,
                "message": "Question not added! "
            });
        });

}


module.exports = {
    answerDelete,
    reteriveAnswer,
    postAnswer
}