angular.module("PubQuizApp", ["ngRoute", "ngMaterial", "ngAnimate", "ngStorage",
    "luegg.directives", "ngSanitize"])
    .config(["$routeProvider", "$locationProvider",
        function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/quizmaker.html",
                    controller: "MakerController",
                    controllerAs: "vm"
                })
                .when("/room/:id", {
                    templateUrl: "views/quiz.html",
                    controller: "QuizController",
                    controllerAs: "vm"
                });
        }])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme("default")
            .primaryPalette("green", {"default": "900"})
            .backgroundPalette("grey", {"default": "200"})
            .accentPalette("green")
            .warnPalette("red", {"default": "600"});
    });
