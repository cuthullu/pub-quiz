var server = require("./server/server");
var MongoClient = require("mongodb").MongoClient;
var port = process.env.PORT || 8080;
var dbUri = "mongodb://open:openAsFuck@ds011231.mlab.com:11231/pubquiz";
var mongo = require("mongodb");
MongoClient.connect(dbUri, function (err, db) {
    if (err) {
        console.log("Failed to connect to db", err);
        return;
    }

    server(port, db);
    console.log("Server running on port " + port);
});
