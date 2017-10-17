'use strict';
angular.module('petCard', []);
angular.module('petCard').
	component('petCard', 
			{templateUrl:'/app/pet-card-module/pet-card-module.html',
        controller: function($scope, $http,$routeParams,$location) {
            console.log("Incializando pet card");
            
            var id = $routeParams.id;
            
            $scope.pets = [];
          
            $http.get("/api/pet/" + id).then(function (response){
            	$scope._id = response.data._id;
                $scope.name = response.data.name;
                $scope.birthDate = response.data.birthDate;
                $scope.picture = response.data.picture;
                $scope.especie = response.data.especie;
                $scope.raza = response.data.raza;
                $scope.idClient = response.data.idClient;
                
                console.log($scope.pet);
                
            });
            
            $scope.updatePet=function(){
    	        if($routeParams.id){
    	        	console.log("Changing pet card");
    	            $http.put('/api/pet/'+$routeParams.id,{
    	                "name": $scope.name,
    	                "birthDate": $scope.birthDate,
    	                "picture": $scope.picture,
    	                "especie": $scope.especie,
    	                "raza":$scope.raza,
    	                "idClient": $scope.idClient
    	            })
    	
    	        }else{
    	            $http.post('/api/newpet',{
    	            	"name": $scope.name,
    	                "birthDate": $scope.birthDate,
    	                "picture": $scope.picture,
    	                "especie": $scope.especie,
    	                "raza":$scope.raza,
    	                "idClient": $scope.idClient
    	        })
    	        }
    	        $location.path('/customers')
    	    }
            
            
        }
	
    });