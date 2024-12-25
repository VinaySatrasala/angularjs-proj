(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('AboutController', AboutController);

    function AboutController() {
        var vm = this;
        vm.title = 'About Us';
        vm.description = 'This is an AngularJS application following best practices.';
    }
})();
