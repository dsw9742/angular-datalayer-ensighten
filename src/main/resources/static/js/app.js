angular.module('ProductService', []) // service to retrieve product from server-side
  .factory('ProductHttp', ['$http', function($http){
    var Product = {};
    Product.get = function(id){
		return $http.get('/product/'+id);
	};
    return Product;
  }]);

angular.module('ShoppingCartService', []) // service to persist client-side shopping cart updates to server-side
  .factory('ShoppingCartHttp', ['$http', function($http){
    var ShoppingCart = {};
    ShoppingCart.addToCart = function(item){
		return $http.post('/cart', item);
	};
    return ShoppingCart;
  }]);

angular.module('DigitalDataService', []) // service to retrieve digitalData from server-side
  .factory('DigitalDataHttp', ['$http', function($http){
    var DigitalData = {};
    DigitalData.get = function(pageName){
		return $http.get('/digitaldata/'+pageName);
	};
    return DigitalData;
  }]);

angular.module('app', ['ngRoute', 'ProductService', 'ShoppingCartService', 'DigitalDataService']) // primary application module
  .config(['$routeProvider', function($routeProvider){
	$routeProvider // route changes should always trigger a call to the server to load the full digitalData object
	  .when('/', {
		templateUrl: 'partials/home.html',
		controller: 'home-controller',
		resolve: {
		  digitalData: ['DigitalDataHttp', function(DigitalDataHttp){ // call to server for digitalData
			return DigitalDataHttp.get('home');
		  }]
		}
	  })
	  .when('/product1', {
		templateUrl: 'partials/product1.html',
		controller: 'product1-page-controller',
		resolve: {
		  product: ['ProductHttp', function(ProductHttp){ // call to server for product
			return ProductHttp.get('1');
		  }],
		  digitalData: ['DigitalDataHttp', function(DigitalDataHttp){ // call to server for digitalData
		    return DigitalDataHttp.get('product/1');
		  }]
		},
	  })
	  .when('/product2', {
		templateUrl: 'partials/product2.html',
		controller: 'product2-page-controller',
		resolve: {
		  product: ['ProductHttp', function(ProductHttp){ // call to server for product
			return ProductHttp.get('2');
		  }],
		  digitalData: ['DigitalDataHttp', function(DigitalDataHttp){ // call to server for digitalData
		    return DigitalDataHttp.get('product/2');
		  }]
		},
	  })
  }])
  .controller('app-controller', ['$scope', function($scope) { // primary application controller
	console.log('AngularJS::app-controller::app-controller loaded');
  }])
  .controller('home-controller', ['$scope', 'digitalData', function($scope, digitalData){ // controller to demo "home"-type digitalData functionality
	console.log('AngularJS::home-controller::home-controller loaded');
	console.log('AngularJS::home-controller::digitalData resolve injected %o',digitalData.data);
	// digitalData.data.page.pageInfo.destinationURL = "http://localhost:8080/#/home"; // if desired, any client-side updates to the digitalData object can be made HERE 
	                                                                                   // (commented out because we don't actually want to do this in this case)
	window.digitalData = digitalData.data; // assign fresh digitalData object
	window.digitalDataLastUpdate = new Date(); // update digitalDataLastUpdate. This variable is watched by the tag management system.
	$scope.mouseover = function($event){ // example event #1 to show how events can be incorporated into the digitalData object
	  console.log('AngularJS::home-controller::event::mouseover %o',$event);
	  var event = { // create the event object
		eventInfo: {
		  eventName: "Image Mouseover",
		  eventAction: "imgMouseover",
		  eventPoints: 10,
		  type: "Engagement",
		  timeStamp: new Date(),
		  cause: "moused over image",
		  effect: "increment event points by 10",
		},
		category: {
	      primaryCategory: "Engagement",
	      secondaryCategory: "Mouse",
		},
	  };
	  window.digitalData.event.push(event); // push event object into the digitalData.event array
	  window.digitalDataLastEventUpdate = new Date(); // update digitalDataLastEventUpdate. This variable is watched by the tag management system.
	}
	$scope.mouseclick = function($event){ // example event #2 to show how events can be incorporated into the digitalData object
	  console.log('AngularJS::home-controller::event::mouseclick %o',$event);
	  var event = {
		eventInfo: {
		  eventName: "Image Click",
		  eventAction: "imgClick",
		  eventPoints: 50,
		  type: "Navigation",
		  timeStamp: new Date(),
		  cause: "clicked image",
		  effect: "forward to destination URL; increment event points by 50",
		},
		category: {
	      primaryCategory: "Navigation",
	      secondaryCategory: "Click",
		},
	  };
	  window.digitalData.event.push(event);
	  window.digitalDataLastEventUpdate = new Date();
	}
  }])
  .controller('product1-page-controller', ['$scope', 'digitalData', 'product', function($scope, digitalData, product){ // product controller #1 to demo "product details"-type digitalData functionality
	console.log('AngularJS::product1-page-controller::product1-page-controller loaded');
	console.log('AngularJS::product1-page-controller::digitalData resolve injected %o',digitalData.data);
	window.digitalData = digitalData.data;
	window.digitalDataLastUpdate = new Date();
	console.log('AngularJS::product1-page-controller::product resolve injected %o',product.data);
	$scope.product = product.data
	$scope.addToCart = function($event){ // example event to show how shopping cart-related events can be incorporated into the digitalData object
	  console.log('AngularJS::product1-page-controller::event::addToCart %o',$event);
	  
	  var item = { // create the cart item object
	    productInfo: {
	      productID: "product 1 ID", 
	      productName: "product 1 name", 
	      description: "product 1 description", 
	      productURL: "product 1 URL",
	      productImage: "product 1 image URL", 
	      productThumbnail: "product 1 thumbnail URL", 
	      manufacturer: "product 1 manufacturer", 
	      sku: "product 1 SKU", 
	      color: "product 1 color", 
	      size: "product 1 size",
	    },
	    category: {},
	    quantity: {},
	    price: {},
	    linkedProduct: [],
	    attributes: {}
	  }
	  window.digitalData.cart.item.push(item); // push item object into digitalData.cart.item array
	  window.digitalData.cart.price = "new aggregate cart price"; // perform any other client-side calculations required
	  //ShoppingCartService.addToCart(item) { // Mirror client-side updates on the server-side. These changes will be reflected when the next "page" 
	                                          // template loads and the full digitalData object is refreshed. (commented out because it isn't fully functional)
	  //  .then(function(response) {
	  //    // do whatever needs to be done here
	  //  }
	  //}
	  
	  // also need to trigger updates to digitalData.event for this event, so the tag management system is notified and can react if necessary
	  var event = { // create the event object
		eventInfo: {
		  eventName: "Add Item to Cart",
		  eventAction: "addCartItem",
		  eventPoints: 250,
		  type: "Cart",
		  timeStamp: new Date(),
		  cause: "clicked add to cart",
		  effect: "add item to cart; increment event points by 250",
		},
		category: {
	      primaryCategory: "Cart",
	      secondaryCategory: "Add",
		},
	  };
	  window.digitalData.event.push(event); // push event object into the digitalData.event array
	  window.digitalDataLastEventUpdate = new Date(); // update digitalDataLastEventUpdate. This variable is watched by the tag management system. 
	}
	$scope.moreDetails = function($event){ // example event to show how HTML fragment-related events can be incorporated into the digitalData object
	  console.log('AngularJS::product1-page-controller::event::moreDetails %o',$event);
	  var event = {
		eventInfo: {
		  eventName: "More Product Details Click",
		  eventAction: "clickMoreProductDetails",
		  eventPoints: 100,
		  type: "Interest",
		  timeStamp: new Date(),
		  cause: "clicked more product details",
		  effect: "show more product details; increment event points by 100",
		},
		category: {
	      primaryCategory: "Product",
	      secondaryCategory: "Interest",
		},
	  };
	  window.digitalData.event.push(event);
	  window.digitalDataLastEventUpdate = new Date();
	}
  }])
  .controller('product2-page-controller', ['$scope', 'product', 'digitalData', function($scope, product, digitalData){ // product controller #2 to demo "product details"-type digitalData functionality
	console.log('AngularJS::product2-page-controller::product2-page-controller loaded');
	console.log('AngularJS::product2-page-controller::digitalData resolve injected %o',digitalData.data);
	window.digitalData = digitalData.data;
	window.digitalDataLastUpdate = new Date();
	console.log('AngularJS::product2-page-controller::product resolve injected %o',product.data);
	$scope.product = product.data
	$scope.addToCart = function($event){
	  console.log('AngularJS::product2-page-controller::event::addToCart %o',$event);
	  
	  var item = {
	    productInfo: {
	      productID: "product 2 ID", 
	      productName: "product 2 name", 
	      description: "product 2 description", 
	      productURL: "product 2 URL",
	      productImage: "product 2 image URL", 
	      productThumbnail: "product 2 thumbnail URL", 
	      manufacturer: "product 2 manufacturer", 
	      sku: "product 2 SKU", 
	      color: "product 2 color", 
	      size: "product 2 size",
	    },
	    category: {},
	    quantity: {},
	    price: {},
	    linkedProduct: [],
	    attributes: {}
	  }
	  window.digitalData.cart.item.push(item);
	  window.digitalData.cart.price = "new aggregate cart price"; // perform any other client-side calculations required
	  //ShoppingCartService.addToCart(item) { 
	  //  .then(function(response) {
	  //    // do whatever needs to be done here
	  //  }
	  //}

	  var event = {
		eventInfo: {
		  eventName: "Add Item to Cart",
		  eventAction: "addCartItem",
		  eventPoints: 250,
		  type: "Cart",
		  timeStamp: new Date(),
		  cause: "clicked add to cart",
		  effect: "add item to cart; increment event points by 250",
		},
		category: {
	      primaryCategory: "Cart",
	      secondaryCategory: "Add",
		},
	  };
	  window.digitalData.event.push(event);
	  window.digitalDataLastEventUpdate = new Date();
	}
  }]);