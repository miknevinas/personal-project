angular.module('restaurantApp').service('adminSvc', function($http){
    
    //Display orders
    this.getOrders = function() {
        return $http.get('/api/order');
    }
    
    //Complete order
    this.completeOrder = function(id) {
        return $http.put('/api/order/' + id, {fulfilled: true}).then(function(response) {
            return response;
    });
    }
    
})