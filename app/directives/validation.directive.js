(function() {
    'use strict';

    angular
        .module('myApp')
        .directive('customValidation', customValidation);

    function customValidation() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$validators.customValidation = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    // Add custom validation logic here
                    return true;
                };
            }
        };
    }
})();
