var cm = require("../model/questionModel");



function reteriveQuestion(req, res, next) {
    cm.questionModel.findAll({})
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
function questionDelete(req, res, next) {
    console.log(req.params.qid);
    cm.questionModel.destroy({
        where: { questionId: req.params.qid }
    }).then(function() {
        res.status(201);
        res.send({ " Message": "Question Deleted" })
    }).catch(function(err) {
        console.log(err)
        next({ status: 500, "message": " not deleted" });
    });
}


function postQuestion(req, res, next) {
    console.log(req.body);
    cm.questionModel
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
    reteriveQuestion,
    questionDelete,
    postQuestion
}