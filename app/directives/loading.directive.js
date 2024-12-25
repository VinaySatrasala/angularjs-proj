(function() {
    'use strict';

    angular
        .module('myApp')
        .directive('loading', loading);

    loading.$inject = ['$rootScope'];

    function loading($rootScope) {
        return {
            restrict: 'E',
            template: '<div class="loading-spinner" ng-show="isLoading"><div class="spinner"></div></div>',
            link: function(scope) {
                scope.isLoading = false;
                
                $rootScope.$on('$routeChangeStart', function() {
                    scope.isLoading = true;
                });
                
                $rootScope.$on('$routeChangeSuccess', function() {
                    scope.isLoading = false;
                });
                
                $rootScope.$on('$routeChangeError', function() {
                    scope.isLoading = false;
                });
            }
        };
    }
})();
