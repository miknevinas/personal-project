angular.module('restaurantApp').directive('homeDir', function(){

    return {
        templateUrl: 'js/templates/home.html',
        restrict: 'E',
        controller: function($scope) {
            $(".button-collapse").sideNav();
            $('.modal-trigger').leanModal();
            $('#push,secton').pushpin({ top:$('#push').height() });
            $('.slider').slider({full_width: true, height: 500, indicators: false, transition: 1500, interval: 6000});
        }
    }  
})