(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('productService', productService);

    productService.$inject = ['$http', '$q'];

    function productService($http, $q) {
        var service = {
            getAll: getAll,
            getById: getById,
            create: create,
            update: update,
            remove: remove
        };

        return service;

        function getAll() {
            // Simulated API call
            return $q.when([
                { id: 1, name: 'Product 1', price: 99.99, description: 'Description 1' },
                { id: 2, name: 'Product 2', price: 149.99, description: 'Description 2' },
                { id: 3, name: 'Product 3', price: 199.99, description: 'Description 3' }
            ]);
        }

        function getById(id) {
            // Implementation
            return $q.when({ id: id, name: 'Product ' + id, price: 99.99, description: 'Description ' + id });
        }

        function create(product) {
            // Implementation
            return $q.when(product);
        }

        function update(id, product) {
            // Implementation
            return $q.when(product);
        }

        function remove(id) {
            // Implementation
            return $q.when({ success: true });
        }
    }
})();
