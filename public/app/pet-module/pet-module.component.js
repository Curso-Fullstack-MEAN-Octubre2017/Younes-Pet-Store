'use strict';
angular.module('petList', []);
angular.module('petList').
	component('petList', 
			{templateUrl:'/app/pet-module/pet-module.html',
        controller: function($scope, $http,$routeParams) {
            console.log("Incializando pet list");
            //$scope.pets = [];
            
            $http.get("/api/pets/"+$routeParams.id).then(function (response){
                $scope.pets = response.data;
                console.log($scope.pets);
            });
        }
    });