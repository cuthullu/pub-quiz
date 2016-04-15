var Promise = require("promise");
var mongo = require("mongodb");

function QuizService(db) {

    var quizCollection = db.collection("quiz");
    var crew = db.collection("crew")
    var self = this;

    this.postNewQuiz = function(quiz) {
        return new Promise(function(resolve, reject) {
            quizCollection.insertOne(quiz, function(err, thing) {
                if(err) {
                    reject({code: 500, msg: err});
                } else {
                    quiz._id = thing.insertedId;
                    resolve(quiz);
                }
            });
        });
    }

    this.getQuiz = function (id) {
        return new Promise(function (resolve, reject) {
            quizCollection.findOne({_id: mongo.ObjectID(id)}, function (err, quiz) {
                if (err) {
                    reject({code: 500, msg: err});
                } else if (quiz === null) {
                    reject({code: 404, msg: err});
                }
                else {
                    resolve(quiz);
                }
            });
        });
    };

    this.pressGang = function(quiz) {
        console.log(quiz._id.toString());
        return new Promise(function(resolve, reject) {
            crew.find({quiz: quiz._id.toString()}).toArray(function(err, crew) {
                console.log(crew)
                quiz.crew = crew;
                if (err) {
                    reject({code: 500, msg: err});
                }
                else {
                    resolve(quiz);
                }
            });
        });
    }

    this.addCrewMember = function(quiz, member) {
        member.quiz = quiz;
        return new Promise(function(resolve, reject) {
            crew.insertOne(member, function(err, thing) {
                if (err) {
                    reject({code: 500, msg : err});
                } else {
                    resolve(thing.insertedId);
                }
            })
        });
    }

    this.deleteTeamMember = function(id) {
        return new Promise(function(resolve, reject){
            crew.remove({_id : mongo.ObjectID(id)}, function(err, result) {
                if (err) {
                    reject({code: 500, msg : err});
                } else {
                    resolve();
                }
            })
        });
    }
}

module.exports = QuizService;
