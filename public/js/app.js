angular.module('restaurantApp', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider){

    $stateProvider
        .state('menu', {
        url: '/menu',
        template: '<menu-dir></menu-dir>'
    })
        .state('bar', {
        url: '/bar',
        template: '<bar-dir></bar-dir>'
    })
        .state('events', {
        url: '/events',
        template: '<events-dir></events-dir>'
    })
        .state('contact', {
        url: '/contact',
        template: '<contact-dir></contact-dir>'
    })
        .state('order', {
        url: '/order',
        template: '<order-dir></order-dir>'
    })
        .state('admin', {
        url: '/admin',
        template: '<admin-dir></admin-dir>',
        resolve: {
            user: function(loginSvc, $state) {
                return loginSvc.getCurUser().then(function(response){
                    if (response.status != 200) {
                        $state.go('home');
                    }
                    if (!response.data.admin) {
                        $state.go('home');
                    }
                    return response.data;
                })
            }
        }
    })
        .state('home', {
        url: '/',
        template: '<home-dir></home-dir>' 
    })

    $urlRouterProvider
        .otherwise('/');

})