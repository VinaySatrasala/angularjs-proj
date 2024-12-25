(function() {
    'use strict';

    angular
        .module('myApp')
        .config(config)
        .run(runBlock);

    config.$inject = ['$routeProvider', '$locationProvider'];
    runBlock.$inject = ['$rootScope', '$location', 'authService'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/components/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .when('/products', {
                templateUrl: 'app/components/products/products.view.html',
                controller: 'ProductsController',
                controllerAs: 'vm',
                resolve: {
                    products: ['productService', function(productService) {
                        return productService.getAll();
                    }]
                }
            })
            .when('/products/:id', {
                templateUrl: 'app/components/products/product-detail.view.html',
                controller: 'ProductDetailController',
                controllerAs: 'vm',
                resolve: {
                    product: ['$route', 'productService', 
                        function($route, productService) {
                            return productService.getById($route.current.params.id);
                        }
                    ]
                }
            })
            .when('/users', {
                templateUrl: 'app/components/users/users.view.html',
                controller: 'UsersController',
                controllerAs: 'vm',
                resolve: {
                    auth: ['authService', function(authService) {
                        return authService.checkAuth();
                    }]
                }
            })
            .when('/contact', {
                templateUrl: 'app/components/contact/contact.view.html',
                controller: 'ContactController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: 'app/components/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                resolve: {
                    auth: ['authService', function(authService) {
                        return authService.checkAuth();
                    }]
                }
            })
            .when('/about', {
                templateUrl: 'app/components/about/about.view.html',
                controller: 'AboutController',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/' });
    }

    function runBlock($rootScope, $location, authService) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.loading = false;
        });

        $rootScope.$on('$routeChangeError', function() {
            $rootScope.loading = false;
            $location.path('/');
        });
    }
})();
