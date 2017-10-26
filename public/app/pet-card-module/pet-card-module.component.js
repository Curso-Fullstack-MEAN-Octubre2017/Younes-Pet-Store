'use strict';
angular.module('petCard', []);
angular.module('petCard').
	component('petCard', 
			{templateUrl:'/app/pet-card-module/pet-card-module.html',
        controller: function($scope, $http,$routeParams,$location,petService) {
        	/*
            console.log("Incializando pet card");
            
            var id = $routeParams.id;
            
           
            $scope.pets = [];
          
            $http.get("/api/pet/" + id).then(function (response){
            	$scope.pet=response.data;
            	$scope.birthDate = moment(response.data.birthDate).toDate();
            	console.log(response.data.birthDate);
                console.log($scope.pet);
                
            });
            
            $scope.updatePet=function(){
    	        if($routeParams.id){
    	        	console.log("Changing pet card");
    	            $http.put('/api/pet/'+$routeParams.id,{
    	                "name": $scope.name,
    	                "birthDate": $scope.birthDate,
    	                "picture": $scope.picture,
    	                "shipNumber":$scope.shipNumber,
    	                "especie": $scope.especie,
    	                "raza":$scope.raza,
    	                "idClient": $scope.idClient
    	            })
    	
    	        }else{
    	            $http.post('/api/pets',{
    	            	"name": $scope.name,
    	                "birthDate": $scope.birthDate,
    	                "picture": $scope.picture,
    	                "shipNumber":$scope.shipNumber,
    	                "especie": $scope.especie,
    	                "raza":$scope.raza,
    	                "idClient": $scope.idClient
    	        })
    	        $scope.$emit("message:success", {message: "Pet dado de alta con exito"});
    	        //alert("dado alta");
    	        }
    	        
    	        $location.path('/customers')
    	    }
           */ 
        	
        	console.log("CustomerController");
        	$scope.pets = {};
        	var id = $routeParams.id;
        	if(id != 'new') {
        		$scope.pets = petService.get({id: id});
        	}
        	
        	$scope.submit = function() {
        		console.log("Submit", $scope.pets);
        		/*
        		const validationErrors = Validators.validateCustomer($scope.customer);
        		if(validationErrors) {
        			return alert(JSON.stringify(validationErrors));
        		}    		
        		*/
        		var errorCallback = function(response) { console.log("Error", response);}

        		var isNew = !$scope.pets._id;
        		if(isNew) {
        			petService.save({}, $scope.pets, function(pets) {
        				$scope.$emit("message:success", {message: "Cliente dado de alta con exito"})
        				$location.path("customers");
        			}, errorCallback);
        		} else {
        			petService.update({id: $scope.pets._id}, $scope.pets, function(pets) {
        				$scope.$emit("message:success", {message: "Cliente dado actualizado con exito"})
        				$scope.pets = pets;
        				$location.path("customers");
        			}, errorCallback);    			
        		}
    		}
        	
        	//funcion de borrar atraves del id 
        	$scope.remove = function() {
        		if(confirm("Esta seguro que desea borrar este registro")) {
        			petService.remove({id: $scope.pets._id},
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