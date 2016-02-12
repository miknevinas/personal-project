angular.module('restaurantApp').controller('loginCtrl', function($scope, loginSvc, $state){
    
    $scope.noUser = true;
    
    loginSvc.getCurUser().then(function(response){
        if (response.status ==200){
            $scope.noUser = false;
        }
    })
   
    $scope.createNewUser = function(user) {
        loginSvc.register(user).then(function(response){
            $state.go('order');
            $scope.noUser = false;
            Materialize.toast('Welcome to Manuels!', 3000);
        }) 
    }
    
    $scope.loginUser = function(user) {
        loginSvc.login(user).then(function(response){
            $state.go('order');
            $scope.noUser = false;
            Materialize.toast('Logged In!', 3000)
        })
    }
    
    $scope.logoutUser = function() {
        loginSvc.logoutUser().then(function(response) {
            $state.go('home');
            $scope.noUser = true;
            Materialize.toast('Logged Out', 3000)
        })
    }
})