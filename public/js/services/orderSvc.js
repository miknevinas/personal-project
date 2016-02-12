angular.module('restaurantApp').service('orderSvc', function($http, $q) {

    /*display items*/
    
    this.getMenu = function() {
        return $http.get('/api/menu');
    } 
})