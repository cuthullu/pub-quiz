var express = require("express");
var cookieParser = require("cookie-parser");
var QuizService = require("./quizservice.js");
var SiteParser = require("./pubquizzersService.js");

var bodyParser = require("body-parser");

module.exports = function (port, db) {

    var app = express();
    var router = express.Router();

    app.use(express.static("public"));
    app.use(bodyParser.json());
    app.use(cookieParser());

    var quizService = new QuizService(db);
    var siteParser = new SiteParser();

    router.route("/quiz")
        .post(function (req, res) {
            var quizevent = req.body;
            var quiz  = {}
            quiz.pubquizzers = req.body.url;
            quiz.date =  req.body.date;

            siteParser.getQuizData(quiz, quiz.pubquizzers)
                .then(quizService.postNewQuiz)
                .then(function(quiz) {
                    res.location(quiz._id);
                    res.sendStatus(201);
                })
                .catch(function (err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        });

    router.route("/quiz/:id")
        .get(function (req, res) {
            var id = req.params.id;
            quizService.getQuiz(id)
                .then(quizService.pressGang)
                .then(function (quiz) {
                    res.json(quiz);
                })
                .catch(function (err) {
                    res.sendStatus(err.code);
                }
            );
        });
    router.route("/quiz/:id/team")
        .post(function (req, res) {
            var member = req.body;
            var quiz = req.params.id

            quizService.addCrewMember(quiz,member)
                .then(function (id) {
                    res.location(id);
                    res.sendStatus(201);
                })
                .catch(function (err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        })
        .delete(function (req, res) {
            var member = req.body;
            var quiz = req.params.id;

            quizService.deleteTeamMember(quiz, member)
                .then(function() {
                    res.sendStatus(204)
                })
                .catch(function (err) {
                    res.set("responseText", err.msg);
                    res.sendStatus(err.code);
                });
        });

    app.use("/api", router);

    return app.listen(port);
};
