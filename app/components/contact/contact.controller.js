(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$location'];

    function ContactController($location) {
        var vm = this;
        vm.formData = {};
        vm.submitForm = submitForm;
        
        function submitForm() {
            // Handle form submission
            console.log('Form submitted:', vm.formData);
            // Redirect after submission
            $location.path('/');
        }
    }
})();
