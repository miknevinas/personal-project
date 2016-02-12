angular.module('restaurantApp').directive('barDir', function(){

    return {
        templateUrl: 'js/templates/bar.html',
        restrict: 'E',
        controller: function($scope) {
            $('.slider').slider({full_width: false, width: 200, indicators: false, transition: 1500, interval: 6000});
            $('ul.tabs').tabs({scroll: false});
        }
    }  
})