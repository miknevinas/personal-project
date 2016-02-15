angular.module('restaurantApp').service('cartSvc', function($http) {
    
    var localStorageKey = 'meh123';
    var cartsArray = [];
    this.addToCart = function(item) { 
        if(!cartsArray) {
            cartsArray = [];
        }
        cartsArray.push(item);
        localStorage.setItem(localStorageKey, JSON.stringify(cartsArray));
    }
    
    this.getCart = function() {
        if(!cartsArray) {
            cartsArray = [];
        }
        if (cartsArray.length === 0) { 
            var data = localStorage.getItem(localStorageKey);
            cartsArray = JSON.parse(data);
        } 
        return cartsArray;
    }
    
    this.removeItem = function(index) {
        cartsArray.splice(index, 1);
        localStorage.setItem(localStorageKey, JSON.stringify(cartsArray));
    }
    
    this.submitOrder = function(order) {
        return $http.post('/api/order', order).then(function(response) {
            localStorage.setItem(localStorageKey, JSON.stringify([]));
            cartsArray = [];
            return response;
        }, function(err){
            console.log(err);
        })
    }
})