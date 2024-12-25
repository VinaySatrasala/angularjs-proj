(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['products', 'productService'];

    function ProductsController(products, productService) {
        var vm = this;
        vm.products = products;
        vm.searchText = '';
        vm.sortBy = 'name';
        vm.reverse = false;
        
        vm.sortProducts = sortProducts;
        vm.searchProducts = searchProducts;

        function sortProducts(field) {
            vm.sortBy = field;
            vm.reverse = !vm.reverse;
        }

        function searchProducts() {
            if (!vm.searchText) {
                return vm.products;
            }
            return vm.products.filter(function(product) {
                return product.name.toLowerCase().includes(vm.searchText.toLowerCase());
            });
        }
    }
})();
