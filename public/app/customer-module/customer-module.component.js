'use strict';
angular.module('customerList', []);

angular.module('customerList').
	component('customerList', 
			{templateUrl:'/app/customer-module/customer-module.html',
			controller: function($rootScope, $scope, $http,$location, $routeParams, customersService) {
				
				
				/* prueba de socketio */
				/*
				var socket = io.connect();
				socket.on('appointments:evento1', function(data) {
					console.log("Recibido el evento c:evento1", data);
					// realizar operaciones relacionadas con este evento})
				})
				
				/************************************************************/
				
				
				
				 console.log("Incializando costumer list resource");
			    	$scope.customers = [];
			    	
			    	//recibir el evento desde el hijo 
			    	$rootScope.$on("message:success",function(event,message){
			    		alert(message.message);
			    		
			    	})
			    	/**************************************************************/
			    	
					$scope.search = {};
					if($location.search().searchTerm) {
						$scope.search.searchTerm = $location.search().searchTerm;
					}
					//Validaciones 
//					customersService.query($scope.search, function(response) {
//			    		$scope.customerList = response.data;
//			    	});
					/***********************************************/
					$scope.customers = customersService.query();
					console.log($scope.customers);
					


			    	$scope.searchCustomers = function() {
			    		$location.search("searchTerm", $scope.search.searchTerm);
			    		$scope.customers = customersService.query($scope.search);
			    		console.log("2:"+$scope.customers);
			    	};
			    	
			    	//funcion de borrar atraves del id 
		        	$scope.remove = function(id) {
		        		if(confirm("Esta seguro que desea borrar este registro")) {
		        			customersService.remove({id: id},
		    					function() {
		    						alert("Borrado OK");
		    						$location.path("customers");
		    					}, function() {
		    						alert("Borrado Failed!!");
		    					});
		    				}
		        	};
		        	
			
		}
	});


	
	