(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ProductDetailController', ProductDetailController);

    ProductDetailController.$inject = ['$routeParams', 'product', 'productService'];

    function ProductDetailController($routeParams, product, productService) {
        var vm = this;
        
        // Properties
        vm.product = product;
        vm.quantity = 1;
        vm.newReview = {
            rating: 5,
            comment: ''
        };
        
        // Methods
        vm.addToCart = addToCart;
        vm.addReview = addReview;
        
        // Implementation
        function addToCart(product, quantity) {
            // Implementation for adding to cart
            console.log('Adding to cart:', product, 'Quantity:', quantity);
        }
        
        function addReview() {
            var review = angular.copy(vm.newReview);
            review.date = new Date();
            review.userName = 'Anonymous'; // Replace with actual user name when authentication is implemented
            
            if (!vm.product.reviews) {
                vm.product.reviews = [];
            }
            
            vm.product.reviews.unshift(review);
            
            // Reset form
            vm.newReview = {
                rating: 5,
                comment: ''
            };
            
            // In a real application, you would save this to the backend
            productService.addReview($routeParams.id, review)
                .then(function(response) {
                    console.log('Review added successfully');
                })
                .catch(function(error) {
                    console.error('Error adding review:', error);
                });
        }
    }
})();
