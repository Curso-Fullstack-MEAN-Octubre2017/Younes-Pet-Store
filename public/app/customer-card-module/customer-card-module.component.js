'use strict';
angular.module('customerCard', []);
angular.module('customerCard').
	component('customerCard', 
			{templateUrl:'/app/customer-card-module/customer-card-module.html',
        controller: function($scope, $http,$routeParams,$location) {
            console.log("Incializando customer card");
            
            var id = $routeParams.id;
            
            $scope.customer = {};
            if(id != ""){
	            $http.get("/api/customer/" + id).then(function (response){
	            	$scope.customer= response.data;
	                console.log("Customer Details:", $scope.customer);
	                
	            });
            }
            
            $scope.updateClient=function(){
    	        if($routeParams.id){
    	            console.log('put')
    	            $http.put('/api/customer/'+$routeParams.id,$scope.customer)
    	
    	        }else{
    	            console.log('post')
    	            $http.post('/api/newcustomer',$scope.customer)
    	        }
    	        $location.path('/customers')
    	    }
    	
            
            
            
        }
	
		
		
    });

