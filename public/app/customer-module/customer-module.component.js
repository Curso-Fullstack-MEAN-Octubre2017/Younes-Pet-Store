'use strict';
angular.module('customerList', []);

angular.module('customerList').
	component('customerList', 
			{templateUrl:'/app/customer-module/customer-module.html',
			controller: function($rootScope, $scope, $http,$location, $routeParams, customersService) {
				 console.log("Incializando costumer list resource");
			    	$scope.customers = [];
			    	
			    	$rootScope.$on("message:success",function(event,message){
			    		alert(message.message);
			    		
			    	})
			    	
					$scope.search = {};
					if($location.search().searchTerm) {
						$scope.search.searchTerm = $location.search().searchTerm;
					}

//					customersService.query($scope.search, function(response) {
//			    		$scope.customerList = response.data;
//			    	});
					
					$scope.customers = customersService.query();
					console.log($scope.customers);


			    	$scope.searchCustomers = function() {
			    		$location.search("searchTerm", $scope.search.searchTerm);
			    		$scope.customers = customersService.query($scope.search);
			    	};
			
		}
			});
		/*
        controller: function($scope, $http) {
            console.log("Incializando costumer list");
            
            
            /*
            $scope.customers = [];
            
            $http.get("/api/customers").then(function (response){
                $scope.customers = response.data;
                console.log($scope.customers);
            });
            
       }
	})
	*/
	