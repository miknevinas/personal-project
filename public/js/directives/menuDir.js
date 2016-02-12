angular.module('restaurantApp').directive('menuDir', function(){

    return {
        templateUrl: 'js/templates/menu.html',
        restrict: 'E',
        controller: function($scope) {
            $('ul.tabs').tabs();
        }
    }  
})