angular.module('restaurantApp').directive('adminDir', function(){

    return {
        templateUrl: 'js/templates/admin.html',
        restrict: 'E',
        controller: function($scope, loginSvc, adminSvc, $state) {
            var result = loginSvc.getCurUser();
            if (result === null || result.admin === false) {
                $state.go('home');
            }
            
            adminSvc.getOrders().then(function(response){
                $scope.orders = response.data;
                console.log('orders from server:', response.data);
            })
            
            $scope.completeOrder = function(id) {
                adminSvc.completeOrder(id).then(function(response){
                    adminSvc.getOrders().then(function(response){
                        $scope.orders = response.data;
                        console.log('orders from server:', response.data);
                    })
                    Materialize.toast('Order Complete!', 3000)
                })
            }
            
            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrain_width: true,
                hover: true,
                gutter: 0, 
                belowOrigin: false
            });
            
            $scope.orderFulfilled = function(fulfilled) {
                $scope.filterObj = {fulfilled: fulfilled};
                if (fulfilled === true) {
                    $scope.hideAction = true;
                } else {
                    $scope.hideAction = false;
                }
            }
            $scope.orderFulfilled(false);  
            $scope.hideAction = false;
        }
    }  
})