var Promise = require("promise");
var YQL = require("yql");

function SiteParser() {
    //var theStatment = "select * from html where url='http://www.pubquizzers.com/pub-quiz/541/cotham-porter-stores/' and xpath='//td[contains(@id,'quizleft')]'"
    var query = new YQL('SELECT * from html WHERE (url = @url) AND ( xpath = @xpath)');
    var xpath = "//td[@id='quizleft']";
    this.getQuizData = function (quiz) {

        return new Promise(function (resolve, reject) {
            query.setParam('xpath', xpath)
                .setParam('url', quiz.pubquizzers)
                .exec(function(err, resp) {
                    if(err) {reject({code: 500, msg: err});}
                    else {
                        parseResponse(quiz, resp);
                        resolve(quiz);
                    }
                });
        });
    }

    function parseResponse(quiz, resp) {
        resp.query.results.td.forEach(function(td){
            var alt = td.img.alt;
            switch (alt) {
                case "Globe":
                    quiz.location = td.content.trim();
                    break;
                case "Post":
                    quiz.postCode = td.content.trim();
                    break;
                case "Calendar":
                    quiz.day = td.content.split(",")[0].trim();
                    quiz.time = td.content.split(",")[1].trim();
                    break;
                case "Website":
                    quiz.website = td.a.href;
                    break;
                case "Entry Fee":
                    quiz.fee = td.content.trim();
                    break;
                case "Cash Jackpot":
                    quiz.cashPrize = td.content.trim();
                    break;
                case "Other Prizes":
                    quiz.otherPrizes = td.content.trim();
                    break;
                case "Max Number Of People":
                    quiz.maxInEnglish = td.content.trim();
                    quiz.max = parseTeamSize(td.content.trim());
                    break;
                case "Verified?" :
                    break;
                default:
                    quiz[alt.toLowerCase()] = td.content.trim();
            }
        })
    }

    function parseTeamSize(str) {
        var i = parseInt(str.trim().split(" ")[0]);
        return i === NaN? 6: i;
    }
}

module.exports = SiteParser
