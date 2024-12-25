(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('userService', userService);

    userService.$inject = ['$http', '$q'];

    function userService($http, $q) {
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
                { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
                { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
            ]);
        }

        function getById(id) {
            return $q.when({
                id: id,
                name: 'User ' + id,
                email: 'user' + id + '@example.com',
                role: 'user'
            });
        }

        function create(user) {
            return $q.when(Object.assign({}, user, { id: Date.now() }));
        }

        function update(id, user) {
            return $q.when(Object.assign({}, user));
        }

        function remove(id) {
            return $q.when({ success: true });
        }
    }
})();
