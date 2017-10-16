'use strict';
angular.module('customerCard', []);
angular.module('customerCard').
	component('customerCard', 
			{templateUrl:'/app/customer-card-module/customer-card-module.html',
        controller: function($scope, $http,$routeParams,$location) {
            console.log("Incializando customer card");
            
            var id = $routeParams.id;
            
            $scope.customers = [];
          
            $http.get("/api/customers/" + id).then(function (response){
            	$scope._id = response.data._id;
                $scope.dni = response.data.dni;
                $scope.firstName = response.data.firstName;
                $scope.lastName = response.data.lastName;
                $scope.phone = response.data.phone;
                $scope.email = response.data.email;
                $scope.note = response.data.note;
                
                console.log($scope.customers);
                
            });
            
            $scope.updateClient=function(){
    	        if($routeParams.id){
    	            console.log('put')
    	            $http.put('/api/customers/'+$routeParams.id,{
    	                "firstName": $scope.firstName,
    	                "lastName": $scope.lastName,
    	                "mail": $scope.email,
    	                "phone": $scope.phone,
    	                "dni":$scope.dni,
    	                "note": $scope.note
    	            })
    	
    	        }else{
    	            console.log('post')
    	            $http.post('/api/customers',{
    	            "firstName": $scope.firstName,
    	            "lastName": $scope.lastName,
    	            "mail": $scope.email,
    	            "phone": $scope.phone,
    	            "dni":$scope.dni,
    	            "note": $scope.note
    	        })
    	        }
    	        $location.path('/customers')
    	    }
    	
            
            
            
        }
	
		
		
    });

