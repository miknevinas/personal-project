angular.module('restaurantApp').directive('orderDir', function(){

    return {
        templateUrl: 'js/templates/order.html',
        restrict: 'E',
        controller: function($scope, orderSvc, cartSvc) {
            
            orderSvc.getMenu().then(function(response){
                $scope.menu = response.data;
                console.log('menu items:', response.data);
            });
            
            $scope.addModal = function(item){
                $scope.selectedItem = item;
                $scope.food = {};
                $('#addModal').openModal();
            };
            
            $scope.addToCart = function(item, order) {
                order.item = item;
                if (!order.amount) {
                    Materialize.toast('Please select your amount!', 3000)
                } else if (!order.details) {
                    order.details = 'none';
                    order.item.price *= order.amount;
                    cartSvc.addToCart(order);
                    loadCart();
                } else {
                    order.item.price *= order.amount;
                    cartSvc.addToCart(order);
                    loadCart();
                }
            };
            
            $scope.removeModal = function(index){
                $scope.selectedItem = JSON.parse(JSON.stringify(index));
                $('#removeModal').openModal();
            };
            
            $scope.removeItem = function(index) {
                cartSvc.removeItem(index);
                loadCart();
            }
            
            var loadCart = function() {
                $scope.cart = cartSvc.getCart();
                if(!$scope.cart) {
                    $scope.cart = [];
                }
                if ($scope.cart.length === 0) {
                    $scope.showCart = false;
                } else {
                    $scope.showCart = true;
                }   
            }
            loadCart();
            
            $scope.submitModal = function(index){
                $scope.selectedItem = JSON.parse(JSON.stringify(index));
                $('#submitModal').openModal();
            };
            
            $scope.submitOrder = function(cart) {
                var order = {items:cart};
                cartSvc.submitOrder(order).then(function(response){
                    $scope.cart = [];
                    $scope.showCart = false;
                })
                Materialize.toast('Your order has been submitted!', 3000);
            };
        }
    }
})