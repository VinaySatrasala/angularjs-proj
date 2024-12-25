(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('authService', authService);

    authService.$inject = ['$q'];

    function authService($q) {
        var service = {
            checkAuth: checkAuth,
            login: login,
            logout: logout
        };

        return service;

        function checkAuth() {
            // Implementation
            return $q.when(true);
        }

        function login(credentials) {
            // Implementation
            return $q.when({ token: 'dummy-token' });
        }

        function logout() {
            // Implementation
            return $q.when(true);
        }
    }
})();
