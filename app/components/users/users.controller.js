(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['userService'];

    function UsersController(userService) {
        var vm = this;
        vm.users = [];
        vm.currentUser = null;
        vm.errorMessage = '';
        
        vm.getUsers = getUsers;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        
        activate();
        
        function activate() {
            return getUsers();
        }
        
        function getUsers() {
            return userService.getAll()
                .then(function(data) {
                    vm.users = data;
                    return vm.users;
                })
                .catch(function(error) {
                    vm.errorMessage = 'Error loading users: ' + error.message;
                });
        }
        
        function selectUser(user) {
            vm.currentUser = angular.copy(user);
        }
        
        function updateUser(user) {
            return userService.update(user.id, user)
                .then(function() {
                    return getUsers();
                })
                .catch(function(error) {
                    vm.errorMessage = 'Error updating user: ' + error.message;
                });
        }
    }
})();
