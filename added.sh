# Create Products view
cat > app/components/products/products.view.html << 'EOF'
<div class="row">
    <div class="col-md-12">
        <h2>Products</h2>
        
        <!-- Search and Sort Controls -->
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" class="form-control" 
                                   placeholder="Search products..." 
                                   ng-model="vm.searchText" 
                                   ng-change="vm.searchProducts()">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="btn-group pull-right">
                            <button type="button" class="btn btn-default" 
                                    ng-click="vm.sortProducts('name')"
                                    ng-class="{active: vm.sortBy === 'name'}">
                                Name 
                                <span ng-show="vm.sortBy === 'name'">
                                    <i class="glyphicon" 
                                       ng-class="{'glyphicon-chevron-up': !vm.reverse, 'glyphicon-chevron-down': vm.reverse}"></i>
                                </span>
                            </button>
                            <button type="button" class="btn btn-default" 
                                    ng-click="vm.sortProducts('price')"
                                    ng-class="{active: vm.sortBy === 'price'}">
                                Price
                                <span ng-show="vm.sortBy === 'price'">
                                    <i class="glyphicon" 
                                       ng-class="{'glyphicon-chevron-up': !vm.reverse, 'glyphicon-chevron-down': vm.reverse}"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Products Grid -->
        <div class="row">
            <div class="col-md-4" ng-repeat="product in vm.searchProducts() | orderBy:vm.sortBy:vm.reverse">
                <div class="panel panel-default product-panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{product.name}}</h3>
                    </div>
                    <div class="panel-body">
                        <img ng-src="{{product.imageUrl || '/assets/img/placeholder.png'}}" 
                             class="img-responsive" alt="{{product.name}}">
                        <div class="product-price">${{product.price.toFixed(2)}}</div>
                        <p class="product-description">{{product.description}}</p>
                    </div>
                    <div class="panel-footer">
                        <a href="#/products/{{product.id}}" class="btn btn-primary">View Details</a>
                        <button class="btn btn-success pull-right" 
                                ng-click="vm.addToCart(product)">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- No Products Found Message -->
        <div class="alert alert-info" ng-if="vm.searchProducts().length === 0">
            No products found matching your search criteria.
        </div>
    </div>
</div>
EOF

# Create Product Detail view
cat > app/components/products/product-detail.view.html << 'EOF'
<div class="row">
    <div class="col-md-12">
        <ol class="breadcrumb">
            <li><a href="#/products">Products</a></li>
            <li class="active">{{vm.product.name}}</li>
        </ol>
    </div>
    
    <div class="col-md-6">
        <div class="panel panel-default">
            <div class="panel-body">
                <img ng-src="{{vm.product.imageUrl || '/assets/img/placeholder.png'}}" 
                     class="img-responsive" alt="{{vm.product.name}}">
            </div>
        </div>
    </div>
    
    <div class="col-md-6">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">{{vm.product.name}}</h3>
            </div>
            <div class="panel-body">
                <h4 class="text-primary">${{vm.product.price.toFixed(2)}}</h4>
                
                <div class="product-description">
                    <h5>Description:</h5>
                    <p>{{vm.product.description}}</p>
                </div>
                
                <div class="product-specs" ng-if="vm.product.specifications">
                    <h5>Specifications:</h5>
                    <ul class="list-unstyled">
                        <li ng-repeat="(key, value) in vm.product.specifications">
                            <strong>{{key}}:</strong> {{value}}
                        </li>
                    </ul>
                </div>
                
                <div class="form-group">
                    <label>Quantity:</label>
                    <select class="form-control" ng-model="vm.quantity" 
                            ng-options="n for n in [1,2,3,4,5]">
                    </select>
                </div>
                
                <button class="btn btn-lg btn-success" 
                        ng-click="vm.addToCart(vm.product, vm.quantity)">
                    Add to Cart
                </button>
            </div>
        </div>
        
        <!-- Reviews Section -->
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Customer Reviews</h3>
            </div>
            <div class="panel-body">
                <div ng-repeat="review in vm.product.reviews" class="review-item">
                    <div class="review-header">
                        <span class="rating">
                            <i ng-repeat="star in [1,2,3,4,5]" 
                               class="glyphicon" 
                               ng-class="{'glyphicon-star': star <= review.rating, 'glyphicon-star-empty': star > review.rating}">
                            </i>
                        </span>
                        <span class="reviewer">{{review.userName}}</span>
                        <span class="review-date pull-right">{{review.date | date}}</span>
                    </div>
                    <p>{{review.comment}}</p>
                </div>
                
                <!-- Add Review Form -->
                <form name="reviewForm" ng-submit="reviewForm.$valid && vm.addReview()" novalidate>
                    <div class="form-group">
                        <label>Your Rating:</label>
                        <select class="form-control" ng-model="vm.newReview.rating" required>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Your Review:</label>
                        <textarea class="form-control" ng-model="vm.newReview.comment" 
                                  rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" 
                            ng-disabled="reviewForm.$invalid">
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
EOF

# Create ProductDetailController
cat > app/components/products/product-detail.controller.js << 'EOF'
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
EOF

# Add some additional CSS for products
cat >> assets/css/styles.css << 'EOF'
/* Product specific styles */
.product-panel {
    transition: all 0.3s ease;
    height: 100%;
}

.product-panel:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.product-panel .panel-body {
    padding: 15px;
}

.product-price {
    font-size: 1.5em;
    color: #2ecc71;
    margin: 10px 0;
    font-weight: bold;
}

.product-description {
    margin: 15px 0;
    min-height: 60px;
}

.review-item {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
}

.review-item:last-child {
    border-bottom: none;
}

.review-header {
    margin-bottom: 5px;
}

.rating {
    color: #f1c40f;
    margin-right: 10px;
}

.reviewer {
    font-weight: bold;
}

.review-date {
    color: #777;
}
EOF