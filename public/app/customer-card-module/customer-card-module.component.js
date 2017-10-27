'use strict';
angular.module('customerCard', []);
angular.module('customerCard').
	component('customerCard', 
			{templateUrl:'/app/customer-card-module/customer-card-module.html',
        controller: function($scope, $http,$routeParams,$location,customersService,$rootScope) {
        	$scope.customer = {};
        	
        	$rootScope.$on("message:success",function(event,message){
	    		alert(message.message);
	    		
	    	})
        	var id = $routeParams.id;
        	if(id) {
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
        	
        	//funcion de borrar atraves del id 
        	$scope.remove = function() {
        		if(confirm("Esta seguro que desea borrar este registro")) {
        			customersService.remove({id: $scope.customer._id},
    					function() {
        					console.log("hola");
    						alert("Borrado OK");
    						$location.path("/");
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

