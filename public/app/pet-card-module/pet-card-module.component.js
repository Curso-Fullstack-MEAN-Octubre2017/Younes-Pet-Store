'use strict';
angular.module('petCard', []);
angular.module('petCard').
	component('petCard', 
			{templateUrl:'/app/pet-card-module/pet-card-module.html',
        controller: function($scope, $http,$routeParams,$location,petService) {
        	
         	$scope.pets = {};
        	var id = $routeParams.id;
        	var idClient = $routeParams.idClient;
        	console.log("petCard ids:", id, idClient);

        	if(id) {
        		$scope.pets = petService.get({id: id}, function(pet){
        			//console.log(fecha);
        			$scope.pets.birthDate = moment($scope.pets.birthDate).toDate();
        		});
        		
        	} else if(idClient){
        		$scope.pets.idClient = idClient;
        		$scope.pets.birthDate = moment($scope.pets.birthDate).toDate();
        	} else {
        		console.log("Error, no tenemos id ni idCliente")
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
        			/*
        			petService.save({}, $scope.pets, function(pets) {
        				console.log("Pet insertado:",$scope.pets);
        				$scope.$emit("message:success", {message: "Pet dado de alta con exito"})
        				$location.path("customer/"+$scope.pets.idClient);
        			}, errorCallback);*/
        			petService.save({}, $scope.pets, function(customer) {
        				$scope.$emit("message:success", {message: "Cliente dado de alta con exito"})
        				$location.path("customer/"+$scope.pets.idClient);
        			}, errorCallback);
        		} else {
        			petService.update({id: $scope.pets._id}, $scope.pets, function(pets) {
        				$scope.$emit("message:success", {message: "Pet dado actualizado con exito"})
        				$scope.pets = pets;
        				$location.path("customer/"+$scope.pets.idClient);
        			}, errorCallback);    			
        		}
    		}
        	
        	//funcion de borrar atraves del id 
        	$scope.remove = function() {
        		if(confirm("Esta seguro que desea borrar este registro")) {
        			petService.remove({id: $scope.pets._id},
    					function() {
    						alert("Borrado OK");
    						$location.path("customer/"+$scope.pets.idClient);
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