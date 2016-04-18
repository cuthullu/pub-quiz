angular.module("PubQuizApp").controller("RoomController",
    function ($scope, $rootScope, roomService, $routeParams, $localStorage) {

        var messages = [];

        var vm = this;
        vm.limit = 5;
        this.glued = true;
        this.name = "anon";
        vm.emojiMessage = {};

        roomService.watchRoom($routeParams.id);

        var deregisters = [];

        if ($localStorage.liked === undefined) {
            $localStorage.liked = [];
        }

        deregisters.push($rootScope.$on("knockknock", updateRoom));
        $scope.$on("$destroy", destroyThis);

        function updateRoom(event, room) {
            vm.messages = room.messages;
            vm.messages.forEach(setLiked);
        }

        function setLiked(message) {
            message.liked = $localStorage.liked.indexOf(message._id) >= 0;
        }

        function destroyThis() {
            roomService.stopDoingStuff();
            deregisters.forEach(function (watch) {
                watch();
            });
        }

        vm.submit = function() {
            var newMessage  = {
                userName : vm.name,
                content: vm.emojiMessage.messagetext,
                score: 0
            };
            roomService.addMessage($routeParams.id, newMessage);

            vm.messages.push(newMessage);
            vm.emojiMessage = {};
            vm.emojiMessage.replyToUser = vm.submit;
        };
        vm.emojiMessage.replyToUser = vm.submit;

        vm.toggleLiked = function(msg) {
            if (msg.liked) {
                $localStorage.liked.splice($localStorage.liked.indexOf(msg._id), 1);
                msg.score--;
                roomService.decreaseScore(msg);
            } else {
                $localStorage.liked.push(msg._id);
                msg.score++;
                roomService.increaseScore(msg);
            }

            msg.liked = !msg.liked;
        };

    });
