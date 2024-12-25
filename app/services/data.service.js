(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q'];

    function dataService($http, $q) {
        var service = {
            getItems: getItems
        };

        return service;

        function getItems() {
            // Simulated data - in real app, would call API
            return $q.when([
                { title: 'Item 1', description: 'First item description' },
                { title: 'Item 2', description: 'Second item description' },
                { title: 'Item 3', description: 'Third item description' }
            ]);
        }
    }
})();
