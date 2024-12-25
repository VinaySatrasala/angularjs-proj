(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['dataService'];

    function HomeController(dataService) {
        var vm = this;
        vm.title = 'Home';
        vm.items = [];

        activate();

        function activate() {
            return dataService.getItems()
                .then(function(data) {
                    vm.items = data;
                });
        }
    }
})();
