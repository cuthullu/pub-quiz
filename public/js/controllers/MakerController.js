angular.module("PubQuizApp").controller("MakerController",
    function ($scope, $rootScope, $location, quizService) {

        var vm = this;
        vm.quiz = {};
        vm.submit = function () {
            console.log(vm.quiz)
        };


    });
