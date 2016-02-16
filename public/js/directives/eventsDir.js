angular.module('restaurantApp').directive('eventsDir', function(){
//
    return {
        templateUrl: 'js/templates/events.html',
        restrict: 'E',
        controller: function($scope, eventSvc) {
            $scope.submitEmail = function(firstName, lastName, email, phone, guests, occasion, date, location, instructions) {
                var char = email.search("@");
                if (char === -1) {
                    alert("Please enter a valid email address.");
                }

                else if (firstName && lastName && email && phone && guests && occasion && date && location && instructions) {
                    Materialize.toast('Your message has been sent!', 3000);
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