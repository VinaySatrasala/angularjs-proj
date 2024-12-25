(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('NavController', NavController);

    NavController.$inject = ['$location'];

    function NavController($location) {
        var vm = this;
        vm.isCollapsed = true;
        vm.isActive = isActive;

        function isActive(route) {
            return route === $location.path();
        }
    }
})();
