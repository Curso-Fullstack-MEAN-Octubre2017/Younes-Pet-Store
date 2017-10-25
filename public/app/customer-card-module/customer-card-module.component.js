'use strict';
angular.module('customerCard', []);
angular.module('customerCard').
	component('customerCard', 
			{templateUrl:'/app/customer-card-module/customer-card-module.html',
        controller: function($scope, $http,$routeParams,$location,customersService) {
        	
        	/*
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
    	            $http.post('/api/customers',$scope.customer)
    	        }
    	        $location.path('/customers')
    	    }
    		*/
            
        	console.log("CustomerController");
        	$scope.customer = {};
        	var id = $routeParams.id;
        	if(id != 'new') {
        		$scope.customer = customersService.get({id: id});
        	}
        	
        	$scope.submit = function() {
        		console.log("Submit", $scope.customer);
        		/*
        		const validationErrors = Validators.validateCustomer($scope.customer);
        		if(validationErrors) {
        			return alert(JSON.stringify(validationErrors));
        		}    		
        		*/
        		var errorCallback = function(response) { console.log("Error", response);}

        		var isNew = !$scope.customer._id;
        		if(isNew) {
        			customersService.save({}, $scope.customer, function(customer) {
        				$scope.$emit("message:success", {message: "Cliente dado de alta con exito"})
        				$location.path("customers");
        			}, errorCallback);
        		} else {
        			customersService.update({id: $scope.customer._id}, $scope.customer, function(customer) {
        				$scope.$emit("message:success", {message: "Cliente dado actualizado con exito"})
        				$scope.customer = customer;
        				$location.path("customers");
        			}, errorCallback);    			
        		}
    		}
        	
        	$scope.remove = function() {
        		if(confirm("Esta seguro que desea borrar este registro")) {
        			customersService.remove({id: $scope.customer._id},
    					function() {
    						alert("Borrado OK");
    						$location.path("customers");
    					}, function() {
    						alert("Borrado Failed!!");
    					});
    				}
        	};
        	
        	$scope.cancel = function() {
        		history.back();
        	};  
            
        }
	
		
		
    });

