angular.module('restaurantApp').directive('eventsDir', function(){

    return {
        templateUrl: 'js/templates/events.html',
        restrict: 'E',
        controller: function($scope, eventSvc) {
            $scope.submitEmail = function(firstName, lastName, email, phone, guests, occasion, date, location, instructions) {
                var char = email.search("@");
                if (char === -1) {
                    alert("Please enter a valid email address.");
                }
                else if (!subject) {
                    alert("Please enter a subject.")
                }
                else if (!message) {
                    alert("Please enter a message.")
                }

                else if (firstName && lastName && email && phone && guests && occasion && date && location && instructions) {
                    alert("Your message has been sent.")
                    eventSvc.submitEmail(firstName, lastName, email, phone, guests, occasion, date, location, instructions);
                    $scope.firstName = '';
                    $scope.lastName = '';
                    $scope.phone = '';
                    $scope.guests = '';
                    $scope.occasion = '';
                    $scope.date = '';
                    $scope.location = '';
                    $scope.instructions = '';
                }

            }
        }
    }  
})