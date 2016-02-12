angular.module('restaurantApp').service('loginSvc', function($http) {
    
   // var localStorageKey = 'meh456';
    
    this.register = function(user) {
        return $http.post('/auth/local/register', user).then(function(response){
            return response.data;
        })
    }

    this.login = function(user) {
        return $http.post('/auth/local', user).then(function(response){
            return response.data;
        }).catch(function(err){
            console.log(err);
        })
    }
    
    this.getCurUser = function(){
        return $http.get('/me').then(function(response){
            return response;
        })  
    }
    
    this.logoutUser = function() {
        return $http.get('/logout').then(function(response) {
            return response;
        })
    }
})