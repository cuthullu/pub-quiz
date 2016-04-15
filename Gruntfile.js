module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-nodemon");

    var files = ["Gruntfile.js", "server.js",
        "server/**/*.js", "test/**/*.js", "public/**/*.js", "!public/js/vendor/*"];
    var artifactsLocation = "build_artifacts";

    grunt.initConfig({
        nodemon: {
            all: {
                script: "server.js",
                options: {
                    ignore: ["public/", "Gruntfile.js", "build_artifacts"]
                }
            }
        }
    });
    grunt.registerTask("demon", "nodemon");

    grunt.registerTask("default", "nodemon");
};
